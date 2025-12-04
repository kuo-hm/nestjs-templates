import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsPositiveAmountConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return typeof value === 'number' && value > 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a positive number`;
  }
}

export function IsPositiveAmount(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPositiveAmountConstraint,
    });
  };
}

