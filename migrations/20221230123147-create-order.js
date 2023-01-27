'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('orders', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        nickname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING,
        },
        requested: {
          type: Sequelize.TEXT,
        },
        status: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(async () => {
        await queryInterface.addColumn('orders', 'userId', {
          type: Sequelize.INTEGER,
        });
        await queryInterface.addConstraint('orders', {
          fields: ['userId'],
          type: 'foreign key',
          name: 'users_orders_fk',
          references: {
            table: 'users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  },
};
