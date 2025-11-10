import { Request, Response } from 'express';
import { ResourceModel } from '../models/ResourceModel';
import { CreateResourceDto, UpdateResourceDto, ResourceFilter } from '../types/resource';

export class ResourceController {
  static create(req: Request, res: Response): void {
    try {
      const data: CreateResourceDto = req.body;

      // Validation
      if (!data.name || !data.description || !data.status) {
        res.status(400).json({
          error: 'Missing required fields: name, description, status'
        });
        return;
      }

      if (!['active', 'inactive'].includes(data.status)) {
        res.status(400).json({
          error: 'Status must be either "active" or "inactive"'
        });
        return;
      }

      const resource = ResourceModel.create(data);
      res.status(201).json(resource);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to create resource',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  static list(req: Request, res: Response): void {
    try {
      const filters: ResourceFilter = {
        status: req.query.status as 'active' | 'inactive' | undefined,
        name: req.query.name as string | undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
        offset: req.query.offset ? parseInt(req.query.offset as string, 10) : undefined
      };

      const resources = ResourceModel.findAll(filters);
      const total = ResourceModel.count(filters);

      res.status(200).json({
        data: resources,
        total,
        limit: filters.limit,
        offset: filters.offset
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to fetch resources',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  static getById(req: Request, res: Response): void {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        res.status(400).json({
          error: 'Invalid resource ID'
        });
        return;
      }

      const resource = ResourceModel.findById(id);

      if (!resource) {
        res.status(404).json({
          error: 'Resource not found'
        });
        return;
      }

      res.status(200).json(resource);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to fetch resource',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  static update(req: Request, res: Response): void {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        res.status(400).json({
          error: 'Invalid resource ID'
        });
        return;
      }

      const data: UpdateResourceDto = req.body;

      if (data.status && !['active', 'inactive'].includes(data.status)) {
        res.status(400).json({
          error: 'Status must be either "active" or "inactive"'
        });
        return;
      }

      const resource = ResourceModel.update(id, data);

      if (!resource) {
        res.status(404).json({
          error: 'Resource not found'
        });
        return;
      }

      res.status(200).json(resource);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to update resource',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  static delete(req: Request, res: Response): void {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        res.status(400).json({
          error: 'Invalid resource ID'
        });
        return;
      }

      const deleted = ResourceModel.delete(id);

      if (!deleted) {
        res.status(404).json({
          error: 'Resource not found'
        });
        return;
      }

      res.status(200).json({
        message: 'Resource deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        error: 'Failed to delete resource',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

