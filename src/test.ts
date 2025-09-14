import { DataValidator, JsonParser, SchemaConverter, SchemaProcessor, SchemaValidator } from './services';

class ServiceFactory {
  static createSchemaProcessor(): SchemaProcessor {
    const jsonParser = new JsonParser();
    const schemaValidator = new SchemaValidator();
    const schemaConverter = new SchemaConverter();
    const dataValidator = new DataValidator();

    return new SchemaProcessor(jsonParser, schemaValidator, schemaConverter, dataValidator);
  }
}

// Main class
class Main {
  private schemaProcessor: SchemaProcessor;

  constructor(schemaProcessor?: SchemaProcessor) {
    this.schemaProcessor = schemaProcessor || ServiceFactory.createSchemaProcessor();
  }

  public static main() {
    const app = new Main();
    app.run();
  }

  private run(): void {
    // Extract data to separate methods
    const customerDataSchemaString = this.getRuntimeSchema();
    const customerData = this.getRuntimeData();

    // Use the schema processor to handle the entire validation workflow
    this.schemaProcessor.processSchema(customerDataSchemaString, customerData);
  }

  private getRuntimeSchema(): string {
    return `{
    "type": "object",
    "properties": {
      "userData": {
        "type": "object",
        "properties": {
          "firstName": { "type": "string" },
          "lastName": { "type": "string" },
          "email": { "type": "string" },
          "phoneNumber": { "type": "string" },
          "dateOfBirth": { "type": "string" },
          "address": {
            "type": "object",
            "properties": {
              "street": { "type": "string" },
              "city": { "type": "string" },
              "postalCode": { "type": "string" },
              "country": { "type": "string" }
            },
            "required": [
              "street",
              "city",
              "postalCode",
              "country"
            ],
            "additionalProperties": false
          }
        },
        "required": [
          "firstName",
          "lastName",
          "email",
          "phoneNumber",
          "dateOfBirth",
          "address"
        ],
        "additionalProperties": false
      },
      "purchaseHistory": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "productId": { "type": "string" },
            "productName": { "type": "string" },
            "purchaseDate": { "type": "string" },
            "price": { "type": "number" },
            "currency": { "type": "string" },
            "productLink": { "type": "string" }
          },
          "required": [
            "productId",
            "productName",
            "purchaseDate",
            "price",
            "currency",
            "productLink"
          ],
          "additionalProperties": false
        }
      },
      "suggestedItems": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "productId": { "type": "string" },
            "productName": { "type": "string" },
            "price": { "type": "number" },
            "currency": { "type": "string" },
            "productLink": { "type": "string" },
            "reasonForSuggestion": { "type": "string" }
          },
          "required": [
            "productId",
            "productName",
            "price",
            "currency",
            "productLink",
            "reasonForSuggestion"
          ],
          "additionalProperties": false
        }
      },
      "mobileSubscription": {
        "type": "object",
        "properties": {
          "contractId": { "type": "string" },
          "provider": { "type": "string" },
          "planName": { "type": "string" },
          "startDate": { "type": "string" },
          "endDate": { "type": "string" },
          "daysRemaining": { "type": "integer" },
          "currentStatus": { "type": "string" },
          "offers": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "offerId": { "type": "string" },
                "description": { "type": "string" },
                "validUntil": { "type": "string" },
                "discount": { "type": "number" },
                "currency": { "type": "string" }
              },
              "required": [
                "offerId",
                "description",
                "validUntil"
              ],
              "additionalProperties": false
            }
          }
        },
        "required": [
          "contractId",
          "provider",
          "planName",
          "startDate",
          "endDate",
          "daysRemaining",
          "currentStatus",
          "offers"
        ],
        "additionalProperties": false
      }
    },
    "required": [
      "userData",
      "purchaseHistory",
      "suggestedItems",
      "mobileSubscription"
    ],
    "additionalProperties": false
  }`;
  }

  private getRuntimeData(): unknown {
    return {
      userData: {
        firstName: 'John',
        lastName: 'Johnson',
        email: 'liam.johnson@example.com',
        phoneNumber: '+1-202-555-0198',
        dateOfBirth: '1992-04-15',
        address: {
          street: '742 Evergreen Terrace',
          city: 'Springfield',
          postalCode: '62704',
          country: 'USA',
        },
      },
      purchaseHistory: [
        {
          productId: 'P-1001',
          productName: 'Wireless Headphones',
          purchaseDate: '2024-12-20',
          price: 129.99,
          currency: 'USD',
          productLink: 'https://store.example.com/products/wireless-headphones',
        },
        {
          productId: 'P-2002',
          productName: 'Smartphone Case',
          purchaseDate: '2025-02-14',
          price: 19.95,
          currency: 'USD',
          productLink: 'https://store.example.com/products/smartphone-case',
        },
      ],
      suggestedItems: [
        {
          productId: 'P-3003',
          productName: 'Bluetooth Speaker',
          price: 89.5,
          currency: 'USD',
          productLink: 'https://store.example.com/products/bluetooth-speaker',
          reasonForSuggestion: 'Customers who bought headphones also purchased speakers',
        },
        {
          productId: 'P-4004',
          productName: 'Screen Protector',
          price: 12.99,
          currency: 'USD',
          productLink: 'https://store.example.com/products/screen-protector',
          reasonForSuggestion: 'Frequently bought together with smartphone cases',
        },
      ],
      mobileSubscription: {
        contractId: 'C-78910',
        provider: 'TelecomPlus',
        planName: 'Unlimited Data Plan',
        startDate: '2025-01-01',
        endDate: '2025-12-31',
        daysRemaining: 114,
        currentStatus: 'active',
        offers: [
          {
            offerId: 'OFFER-123',
            description: "20% discount on next month's bill",
            validUntil: '2025-09-30',
            discount: 20,
            currency: 'USD',
          },
          {
            offerId: 'OFFER-456',
            description: 'Free streaming package for 3 months',
            validUntil: '2025-12-15',
          },
        ],
      },
    };
  }
}
Main.main();
