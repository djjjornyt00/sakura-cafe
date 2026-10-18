import { Router } from 'express';
import pool from '../db/pool.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    console.error('Проверка базы не удалась:', err.message);
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

export default router;