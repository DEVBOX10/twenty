import { Injectable, Type } from '@nestjs/common';

import { ObjectLiteral } from 'typeorm';

import { WorkspaceDatasourceFactory } from 'src/engine/twenty-orm/factories/workspace-datasource.factory';
import { WorkspaceRepository } from 'src/engine/twenty-orm/repository/workspace.repository';
import { convertClassNameToObjectMetadataName } from 'src/engine/workspace-manager/workspace-sync-metadata/utils/convert-class-to-object-metadata-name.util';

@Injectable()
export class TwentyORMManager {
  constructor(
    private readonly workspaceDataSourceFactory: WorkspaceDatasourceFactory,
  ) {}

  async getRepository<T extends ObjectLiteral>(
    objectMetadataName: string,
  ): Promise<WorkspaceRepository<T>>;

  async getRepository<T extends ObjectLiteral>(
    entityClass: Type<T>,
  ): Promise<WorkspaceRepository<T>>;

  async getRepository<T extends ObjectLiteral>(
    entityClassOrobjectMetadataName: Type<T> | string,
  ): Promise<WorkspaceRepository<T>> {
    let objectMetadataName: string;

    if (typeof entityClassOrobjectMetadataName === 'string') {
      objectMetadataName = entityClassOrobjectMetadataName;
    } else {
      objectMetadataName = convertClassNameToObjectMetadataName(
        entityClassOrobjectMetadataName.name,
      );
    }

    const workspaceDataSource = await this.workspaceDataSourceFactory.create(
      '20202020-1c25-4d02-bf25-6aeccf7ea419',
    );

    if (!workspaceDataSource) {
      throw new Error('Workspace data source not found');
    }

    return workspaceDataSource.getRepository<T>(objectMetadataName);
  }

  async getWorkspaceDatasource() {
    const workspaceId = '20202020-1c25-4d02-bf25-6aeccf7ea419';

    return this.workspaceDataSourceFactory.create(workspaceId);
  }
}
