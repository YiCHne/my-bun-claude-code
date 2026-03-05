const users = [
  { id: '0', name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: '1', name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

let nextId = 2;

export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'POST /api/v1/user': (req: any, res: any) => {
    const { name, nickName, email } = req.body || {};
    const newUser = {
      id: String(nextId++),
      name: name || '',
      nickName: nickName || '',
      email: email || '',
      gender: 'MALE' as const,
    };
    users.push(newUser);
    res.json({
      success: true,
      data: newUser,
      errorCode: 0,
    });
  },
  'GET /api/v1/user/:userId': (req: any, res: any) => {
    const user = users.find((u) => u.id === req.params.userId);
    res.json({
      success: !!user,
      data: user || null,
      errorCode: user ? 0 : 1,
      errorMessage: user ? '' : 'User not found',
    });
  },
  'PUT /api/v1/user/:userId': (req: any, res: any) => {
    const index = users.findIndex((u) => u.id === req.params.userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...req.body };
    }
    res.json({
      success: index !== -1,
      errorCode: index !== -1 ? 0 : 1,
      errorMessage: index !== -1 ? '' : 'User not found',
    });
  },
  'DELETE /api/v1/user/:userId': (req: any, res: any) => {
    const index = users.findIndex((u) => u.id === req.params.userId);
    if (index !== -1) {
      users.splice(index, 1);
    }
    res.json({
      success: index !== -1,
      errorCode: index !== -1 ? 0 : 1,
      errorMessage: index !== -1 ? '' : 'User not found',
    });
  },
};
