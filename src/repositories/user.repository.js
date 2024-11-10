class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getUsers = async () => {
        return await this.dao.get();
    };

    getUser = async (filter) => {
        return await this.dao.getBy(filter);
    };

    createUser = async (newUser) => {
        return await this.dao.create(newUser);
    };
}

export default UserRepository;
