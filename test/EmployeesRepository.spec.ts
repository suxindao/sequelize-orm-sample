///<reference path="../typings/index.d.ts"/>

import * as moment from "moment";
import {assert} from "chai";
import {AdminRepository} from "../src/repository/AdminRepository.ts";
import {AdminInstance, AdminPojo} from "../src/domain/sequelize-types";
import models = require('../src/domain/sequelize-models');
let packageJson = require('../package.json');

let AsyncDone = function (fn) {
  let self = this;
  let called = false;

  this.trigger = function (params) {
    if (called) {
      return;
    }

    fn.apply(self, arguments);
    called = true;
  };
};

let adminRepository: AdminRepository = null;
let adminInstance: AdminInstance[] = null;

describe('Employee Repository Test Suit', function () {
  this.timeout(10000);

  before(function (done) {
    let asyncDone = new AsyncDone(done);

    models.initialize(packageJson.databaseConfig.database, packageJson.databaseConfig.username, packageJson.databaseConfig.password, {
      dialect: packageJson.databaseConfig.dialect,
      define: {
        timestamps: false,
        freezeTableName: true,
      },
      port: packageJson.databaseConfig.port
    });

    adminRepository = new AdminRepository();
    asyncDone.trigger();
  });

  it('should verify repository "findAll" operation', function (done) {
    let asyncDone = new AsyncDone(done);

    adminRepository.findAll()
      .then((result: AdminInstance[]) => {
        adminInstance = result;
        assert.isNotNull(adminInstance);
        assert.isTrue(adminInstance.length > 0);
        asyncDone.trigger();
      })
      .done((error: any) => {
        asyncDone.trigger(error);
      });
  });

  it('should verify repository "create" operation', function (done) {
    let asyncDone = new AsyncDone(done);

    let newEmp: AdminPojo = {
      id: 2,
      name: 'aaa',
      password: '11111',
      create_date: new Date(),
      update_date: new Date()
    };

    adminRepository.create(newEmp)
      .then((result: AdminInstance) => {
        assert.isNotNull(result);
        assert.equal(result.id, newEmp.id);
        assert.equal(result.name, newEmp.name);
        assert.equal(result.password, newEmp.password);
        asyncDone.trigger();
      })
      .done((error: any) => {
        asyncDone.trigger(error);
      });
  });

  it('should verify repository "findOne" operation', function (done) {
    let asyncDone = new AsyncDone(done);

    adminRepository.findOne({where: {id: 2}})
      .then((result: AdminInstance) => {
        assert.isNotNull(result);
        assert.equal(result.id, 2);
        asyncDone.trigger();
      })
      .done((error: any) => {
        asyncDone.trigger(error);
      });
  });

  it('should verify repository "update" operation', function (done) {
    let asyncDone = new AsyncDone(done);

    let updateAttributes: any = {
      name: "bbbb",
      password: "22222"
    };

    adminRepository.update(updateAttributes, {where: {id: 2}})
      .then((result: [number, AdminPojo[]]) => {
        assert.isNotNull(result);
        return adminRepository.findOne({where: {id: 2}});
      })
      .then((result: AdminInstance) => {
        assert.equal(updateAttributes.name, result.name);
        assert.equal(updateAttributes.password, result.password);
        asyncDone.trigger();
      })
      .done((error: any) => {
        asyncDone.trigger(error);
      });
  });

  it('should verify repository "delete" operation', function (done) {
    let asyncDone = new AsyncDone(done);

    adminRepository.deleteRecord({where: {id: 2}})
      .then((result: number) => {
        assert.equal(result, 1);
        return adminRepository.findOne({where: {id: 2}});
      })
      .then((result: AdminInstance) => {
        assert.isNull(result);
        asyncDone.trigger();
      })
      .done((error: any) => {
        asyncDone.trigger(error);
      });
  });
});