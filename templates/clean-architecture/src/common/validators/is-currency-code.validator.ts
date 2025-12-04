import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsCurrencyCodeConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    const currencyCodes = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
    return typeof value === 'string' && currencyCodes.includes(value.toUpperCase());
  }

  defaultMessage() {
    return 'Currency code must be a valid ISO 4217 code';
  }
}

export function IsCurrencyCode(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCurrencyCodeConstraint,
    });
  };
}

