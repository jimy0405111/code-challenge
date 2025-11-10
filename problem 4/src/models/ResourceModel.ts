import db from '../database/database';
import { Resource, CreateResourceDto, UpdateResourceDto, ResourceFilter } from '../types/resource';

export class ResourceModel {
  static create(data: CreateResourceDto): Resource {
    const stmt = db.prepare(`
      INSERT INTO resources (name, description, status, createdAt, updatedAt)
      VALUES (?, ?, ?, datetime('now'), datetime('now'))
    `);
    
    const result = stmt.run(data.name, data.description, data.status);
    return this.findById(result.lastInsertRowid as number)!;
  }

  static findAll(filters: ResourceFilter = {}): Resource[] {
    let query = 'SELECT * FROM resources WHERE 1=1';
    const params: any[] = [];

    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters.name) {
      query += ' AND name LIKE ?';
      params.push(`%${filters.name}%`);
    }

    query += ' ORDER BY createdAt DESC';

    if (filters.limit) {
      query += ' LIMIT ?';
      params.push(filters.limit);
    }

    if (filters.offset) {
      query += ' OFFSET ?';
      params.push(filters.offset);
    }

    const stmt = db.prepare(query);
    const rows = stmt.all(...params) as any[];

    return rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      status: row.status,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    }));
  }

  static findById(id: number): Resource | null {
    const stmt = db.prepare('SELECT * FROM resources WHERE id = ?');
    const row = stmt.get(id) as any;

    if (!row) {
      return null;
    }

    return {
      id: row.id,
      name: row.name,
      description: row.description,
      status: row.status,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    };
  }

  static update(id: number, data: UpdateResourceDto): Resource | null {
    const existing = this.findById(id);
    if (!existing) {
      return null;
    }

    const updates: string[] = [];
    const params: any[] = [];

    if (data.name !== undefined) {
      updates.push('name = ?');
      params.push(data.name);
    }

    if (data.description !== undefined) {
      updates.push('description = ?');
      params.push(data.description);
    }

    if (data.status !== undefined) {
      updates.push('status = ?');
      params.push(data.status);
    }

    if (updates.length === 0) {
      return existing;
    }

    updates.push("updatedAt = datetime('now')");
    params.push(id);

    const stmt = db.prepare(`
      UPDATE resources 
      SET ${updates.join(', ')}
      WHERE id = ?
    `);

    stmt.run(...params);
    return this.findById(id);
  }

  static delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM resources WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  static count(filters: ResourceFilter = {}): number {
    let query = 'SELECT COUNT(*) as count FROM resources WHERE 1=1';
    const params: any[] = [];

    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters.name) {
      query += ' AND name LIKE ?';
      params.push(`%${filters.name}%`);
    }

    const stmt = db.prepare(query);
    const result = stmt.get(...params) as any;
    return result.count;
  }
}

