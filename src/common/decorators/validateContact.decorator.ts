import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
  
  @ValidatorConstraint({ async: false })
  export class IsPhoneNumberConstraint implements ValidatorConstraintInterface {
    validate(phoneNumber: string, args: ValidationArguments): boolean {
      const regex = /^9[78]\d{8}$/;
      return regex.test(phoneNumber);
    }
  
    defaultMessage(args: ValidationArguments): string {
      return 'Phone number must be 10 digits, start with 9, and the second digit must be 7 or 8.';
    }
  }
  
  export function IsPhoneNumber(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsPhoneNumberConstraint,
      });
    };
  }
  