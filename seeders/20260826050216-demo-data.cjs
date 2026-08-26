'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

        await queryInterface.bulkInsert('Users', [
          { name: 'Alice Smith', email: 'alice@example.com', createdAt: now, updatedAt: now },
          { name: 'Bob Jones', email: 'bob@example.com', createdAt: now, updatedAt: now },
          { name: 'Charlie Brown', email: 'charlie@example.com', createdAt: now, updatedAt: now }
        ]);

        const users = await queryInterface.sequelize.query(
          'SELECT id, name FROM "Users";',
          { type: Sequelize.QueryTypes.SELECT }
        );


        const idOf = (name) => users.find((u) => u.name === name).id;

        await queryInterface.bulkInsert('Tasks', [
          { title: 'Learn Sequelize', dueDate: new Date('2026-09-01'), completed: false, userId: idOf('Alice Smith'), createdAt: now, updatedAt: now },
          { title: 'Build an API', dueDate: new Date('2026-09-15'), completed: true, userId: idOf('Alice Smith'), createdAt: now, updatedAt: now },
          { title: 'Write Seeders', dueDate: new Date('2026-08-28'), completed: false, userId: idOf('Bob Jones'), createdAt: now, updatedAt: now },
          { title: 'Test the Routes', dueDate: new Date('2026-08-30'), completed: false, userId: idOf('Bob Jones'), createdAt: now, updatedAt: now },
          { title: 'Update README', dueDate: new Date('2026-09-05'), completed: false, userId: idOf('Charlie Brown'), createdAt: now, updatedAt: now }
        ]);
    },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
