import { EntityManager } from "typeorm";
import { AuthModel } from "../models/auth.model";
import { UserModel } from "../models/user.model";
import { IGenericRepository } from "./generic-repository.abstract";
import { AdminModel } from "../models/admin.model";
import { BookingModel } from "../models/booking.model";
import { FutsalModel } from "../models/futsal.model";
import { FutsalCourtModel } from "../models/futsalCourt.model";
import { FutsalImageModel } from "../models/futsalImage.model";
import { PaymentModel } from "../models/payment.model";
import { PriceModel } from "../models/price.model";
import { ReviewModel } from "../models/review.model";
import { SuperAdminModel } from "../models/superAdmin.model";
import { TimeSlotModel } from "../models/timeSlot.model";

export abstract class IDataServices{
    abstract auth:IGenericRepository<AuthModel>;
    abstract user:IGenericRepository<UserModel>;
    abstract admin:IGenericRepository<AdminModel>;
    abstract booking:IGenericRepository<BookingModel>;
    abstract futsal:IGenericRepository<FutsalModel>;
    abstract futsalCourt:IGenericRepository<FutsalCourtModel>;
    abstract futsalImage:IGenericRepository<FutsalImageModel>;
    abstract timeSlot:IGenericRepository<TimeSlotModel>;
    abstract payment:IGenericRepository<PaymentModel>;
    abstract price:IGenericRepository<PriceModel>;
    abstract review:IGenericRepository<ReviewModel>;
    abstract superAdmin:IGenericRepository<SuperAdminModel>;

      /**
   * Execute a function within a database transaction
   * @param operation The function to execute within the transaction
   * @returns The result of the operation
   */
  abstract transaction<T>(
    operation: (manager: EntityManager) => Promise<T>,
  ): Promise<T>;
}