import User from './user';

export default [
    {
        route: 'usersById[{integers:ids}][{keys:attrs}]',
        get: async (pathSet) => {
            let users = await User.get();
            let usersMap = {};
            users.forEach( (item) => {
                usersMap[item.id] = item;
            });

            let ret = [];
            pathSet.ids.forEach( (id) => {
                pathSet.attrs.forEach( (attr) => {
                    ret.push({
                        path: ['usersById', id, attr],
                        value: usersMap[id][attr],
                    });
                });
            });
            return ret;
        },

    }, {
        route: 'users[{integers:indices}]',
        get: async (pathSet) => {
            let users = await User.get();
            return pathSet.indices.map( (index) => {
                return {
                    path: ['users', index],
                    value: {
                        $type: 'ref',
                        value: ['usersById', users[index].id],
                    },
                };
            });
        },
    }, {
        route: 'users.length',
        get: async (pathSet) => {
            let length = await User.count();
            return { path: ['users', 'length'], value: length[0].count };
        },
    }, {
        route: 'users.add',
        call: async (callPath, args) => {
            let userArr = args;
            let userCount = await User.add(userArr);
            return {
                path: ['users', 'length'],
                value: userCount[0],
            }
        },
    }, {
        route: 'users.remove',
        call: async (callPath, args) => {
            let id = args[0];
            await User.remove(id);
            return {};
        },
    }
];