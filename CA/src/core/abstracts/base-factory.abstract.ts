import { Injectable } from '@nestjs/common';

/**
 * Base Factory Abstract Class
 * Provides common functionality for all factory use case services.
 */
@Injectable()
export abstract class BaseFactoryUseCaseService<
  TModel extends Record<string, any>,
  TCreateDto = any,
  TUpdateDto = any,
> {
  protected abstract createModelInstance(): TModel;

  create(dto: TCreateDto): TModel {
    const model = this.createModelInstance();
    this.populateModel(model, dto);
    return model;
  }

  update(dto: TUpdateDto): TModel {
    const model = this.createModelInstance();
    this.populateModel(model, dto);
    return model;
  }

  protected populateModel(model: TModel, dto: any): void {
    Object.assign(model, dto);
  }

  protected createStubModel<T extends { id: string }>(
    ModelClass: new () => T,
    id: string,
  ): T {
    const stubModel = new ModelClass();
    stubModel.id = id;
    return stubModel;
  }

  protected safeAssign<T extends Record<string, any>>(
    model: T,
    property: keyof T,
    value: any,
  ): void {
    if (value !== undefined && value !== null) {
      model[property] = value;
    }
  }

  protected safeAssignBoolean<T extends Record<string, any>>(
    model: T,
    property: keyof T,
    value: boolean | undefined,
  ): void {
    if (value !== undefined) {
      (model as any)[property] = value;
    }
  }

  protected assignRelationship<
    T extends Record<string, any>,
    R extends { id: string },
  >(model: T, property: keyof T, ModelClass: new () => R, id: string): void {
    if (id) {
      const stubModel = this.createStubModel(ModelClass, id);
      model[property] = stubModel as any;
    }
  }
}
