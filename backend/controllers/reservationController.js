import pool from '../db/pool.js';

export async function createReservation(req, res, next) {
  try {
    const { customer_name, phone, reservation_date, reservation_time, guests_count } = req.body;

    const result = await pool.query(
      `INSERT INTO reservations (customer_name, phone, reservation_date, reservation_time, guests_count)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, customer_name, phone, reservation_date, reservation_time, guests_count, created_at`,
      [customer_name, phone, reservation_date, reservation_time, guests_count]
    );

    res.status(201).json({
      message: 'Столик успешно забронирован!',
      reservation: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
}