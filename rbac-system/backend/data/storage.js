import bcrypt from 'bcryptjs';

// In-memory data storage
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@test.com',
    password: bcrypt.hashSync('password', 10),
    role: 'admin'
  },
  {
    id: '2',
    name: 'Editor User',
    email: 'editor@test.com',
    password: bcrypt.hashSync('password', 10),
    role: 'editor'
  },
  {
    id: '3',
    name: 'Viewer User',
    email: 'viewer@test.com',
    password: bcrypt.hashSync('password', 10),
    role: 'viewer'
  }
];

const articles = [
  {
    id: '1',
    title: 'Welcome to RBAC System',
    content: 'This is a demonstration of role-based access control. Different users have different permissions.',
    createdBy: '1'
  },
  {
    id: '2',
    title: 'Getting Started',
    content: 'Login with different user roles to see how permissions work in action.',
    createdBy: '2'
  }
];

let articleIdCounter = 3;

export const storage = {
  users,
  articles,
  
  findUserByEmail(email) {
    return users.find(u => u.email === email);
  },
  
  findUserById(id) {
    return users.find(u => u.id === id);
  },
  
  getAllArticles() {
    return articles;
  },
  
  createArticle(article) {
    const newArticle = {
      id: String(articleIdCounter++),
      ...article
    };
    articles.push(newArticle);
    return newArticle;
  },
  
  deleteArticle(id) {
    const index = articles.findIndex(a => a.id === id);
    if (index !== -1) {
      articles.splice(index, 1);
      return true;
    }
    return false;
  }
};
