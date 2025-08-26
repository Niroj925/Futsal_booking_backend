export enum RoleType {
    ADMIN = 'ADMIN',
    SUPER_ADMIN = 'SUPER_ADMIN',
    USER = 'USER'
}

export enum AvailabilityStatus {
    BOOKED = 'BOOKED',
    AVAILABLE = 'AVAILABLE',
    RESERVED = 'RESERVED',
    HOLD = 'HOLD',
    PENDING = 'PENDING'
}

export enum BookingStatus {
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    PENDING = 'PENDING'
}


export enum PaymentMethod {
    ONLINE = 'ONLINE',
    CASH = 'CASH',
    ESEWA = 'ESEWA',
    KHALTI = 'KHALTI',
    BANK_TRANSFER = 'BANK_TRANSFER'
}

export enum BillingStatus {
    PAID = 'PAID',
    UNPAID = 'UNPAID'
}

export enum PaymentStatus {
    APPROVED = 'APPROVED',
    PENDING = 'PENDING',
    REJECT = 'REJECT'
}

export enum GenderType {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHERS = 'OTHERS'
}

export enum OtpRequestType {
    REGISTER = 'REGISTER',
    FORGOT_PASSWORD = 'FORGOT_PASSWORD'
}
