import pool from '../db/pool.js';

export async function getMenu(req, res, next) {
  try {
    const result = await pool.query(
      'SELECT id, name, description, price, category, image_url, is_available FROM menu_items WHERE is_available = TRUE ORDER BY id'
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

export async function getMenuItem(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: 'Некорректный id блюда' });
    }

    const result = await pool.query(
      'SELECT id, name, description, price, category, image_url, is_available FROM menu_items WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Блюдо не найдено' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}