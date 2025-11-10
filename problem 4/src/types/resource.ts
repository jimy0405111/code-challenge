export interface Resource {
  id?: number;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateResourceDto {
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

export interface UpdateResourceDto {
  name?: string;
  description?: string;
  status?: 'active' | 'inactive';
}

export interface ResourceFilter {
  status?: 'active' | 'inactive';
  name?: string;
  limit?: number;
  offset?: number;
}

