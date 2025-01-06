
export enum roleType {
    admin='admin',
    superAdmin='superAdmin',
    user='user'
}

export enum availabilityStatus{
    booked='booked',
    available='available',
    reserved='reserved',
    hold='hold',
    pending='pending'
}

export enum bookingStatus{
    approved="approved",
    rejected="rejected",
    pending="pending"
}

export enum enrollStatus {
    approved = "approved",
    pending = "pending",
    reject="reject"
}

export enum tableStatus{
    occupied='occupied',
    available='available'
}


export enum orderStatus {
    pending='pending',
    accepted='accepted',
    delivered = "delivered",
    partiallyDelivered = "partiallyDelivered",
    cancel = "cancel"
}

export enum callType{
    incoming='incoming',
    outgoing='outgoing'
}

export enum documentType {
    citizenship = "citizenship",
    pan = "pan",
    drivingLicense = "drivingLicense",
    passport = "passport"
}

export enum paymentMethod {
    online = "online",
    cash = "cash",
    esewa = "esewa",
    khalti = "khalti",
    bankTransfer = "bankTransfer"
}

export enum billingStatus {
    paid = "paid",
    unpaid = "unpaid"
}

export enum paymentStatus {
    approved = "approved",
    pending = "pending",
    reject = "reject"
}

export enum genderType {
    male = "male",
    female = "female",
    others = "others"
}

export enum otpRequestType {
    register="register",
    forgotPassword='forgotPassword'
}

