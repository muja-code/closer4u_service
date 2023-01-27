'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('reviews', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        mark: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
        await queryInterface.addColumn('reviews', 'userId', {
          type: Sequelize.INTEGER,
        });

        await queryInterface.addConstraint('reviews', {
          fields: ['userId'],
          type: 'foreign key',
          name: 'users_reviews_fk',
          references: {
            table: 'users',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        });

        await queryInterface.addColumn('reviews', 'orderId', {
          type: Sequelize.INTEGER,
        });

        await queryInterface.addConstraint('reviews', {
          fields: ['orderId'],
          type: 'foreign key',
          name: 'orders_reviews_fk',
          references: {
            table: 'orders',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews');
  },
};
