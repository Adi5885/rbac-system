import express from 'express';
import { storage } from '../data/storage.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/roleCheck.js';

const router = express.Router();

// GET all articles - accessible by all authenticated users
router.get('/', authenticate, (req, res) => {
  try {
    const articles = storage.getAllArticles();
    res.json(articles);
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// POST create article - accessible by admin and editor only
router.post('/', authenticate, requireRole('admin', 'editor'), (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    const article = storage.createArticle({
      title,
      content,
      createdBy: req.user.id
    });
    
    res.status(201).json(article);
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// DELETE article - accessible by admin only
router.delete('/:id', authenticate, requireRole('admin'), (req, res) => {
  try {
    const { id } = req.params;
    
    const deleted = storage.deleteArticle(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

export default router;
