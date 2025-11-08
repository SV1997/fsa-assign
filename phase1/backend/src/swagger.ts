import type { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const definition = {
  openapi: "3.0.0",
  info: {
    title: "School Equipment Lending Portal - API Docs",
    version: "1.0.0",
    description:
      "API documentation for the School Equipment Lending Portal (Authentication, Users, Equipment, Requests, Loans).",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local Dev Server",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Use: `Authorization: Bearer <accessToken>`",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
          role: { type: "string", enum: ["ADMIN", "STAFF", "STUDENT"] },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      Equipment: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          category: { type: "string" },
          condition: { type: "string" },
          quantity: { type: "integer" },
          available: { type: "integer" },
        },
      },
      Request: {
        type: "object",
        properties: {
          id: { type: "string" },
          equipmentId: { type: "string" },
          requesterId: { type: "string" },
          from: { type: "string", format: "date-time" },
          to: { type: "string", format: "date-time" },
          status: {
            type: "string",
            enum: ["PENDING", "APPROVED", "REJECTED"],
          },
        },
      },
      Loan: {
        type: "object",
        properties: {
          id: { type: "string" },
          requestId: { type: "string" },
          equipmentId: { type: "string" },
          borrowerId: { type: "string" },
          from: { type: "string", format: "date-time" },
          to: { type: "string", format: "date-time" },
          returnedAt: { type: "string", format: "date-time", nullable: true },
        },
      },
      SignupRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: { type: "string", example: "John Doe" },
          email: { type: "string", example: "john@example.com" },
          password: { type: "string", example: "Secret@123" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", example: "john@example.com" },
          password: { type: "string", example: "Secret@123" },
        },
      },
      CreateEquipmentRequest: {
        type: "object",
        required: ["name", "category", "condition", "quantity", "available"],
        properties: {
          name: { type: "string" },
          category: { type: "string" },
          condition: { type: "string" },
          quantity: { type: "integer" },
          available: { type: "integer" },
        },
      },
      CreateRequestBody: {
        type: "object",
        required: ["equipmentId", "requesterId", "from", "to"],
        properties: {
          equipmentId: { type: "string" },
          requesterId: { type: "string" },
          from: { type: "string", format: "date-time" },
          to: { type: "string", format: "date-time" },
        },
      },
      CreateLoanBody: {
        type: "object",
        required: ["equipmentId", "requestId", "borrowerId", "from", "to"],
        properties: {
          equipmentId: { type: "string" },
          requestId: { type: "string" },
          borrowerId: { type: "string" },
          from: { type: "string", format: "date-time" },
          to: { type: "string", format: "date-time" },
        },
      },
    },
  },
  paths: {
    // ---------- AUTH ----------
    "/auth/signup": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user (default STUDENT)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SignupRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Signup successful",
          },
          400: { description: "Validation error" },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login and get JWT access token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
          },
          401: {
            description: "Invalid credentials",
          },
        },
      },
    },

    // ---------- USERS (Admin only) ----------
    "/users/getallusers": {
      get: {
        tags: ["Users"],
        summary: "Get all users (ADMIN only)",
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: "List of users",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/User" },
                    },
                  },
                },
              },
            },
          },
          401: { description: "Unauthorized" },
          403: { description: "Forbidden" },
        },
      },
    },
    "/users/updateuser": {
      put: {
        tags: ["Users"],
        summary: "Update user details (ADMIN only)",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  name: { type: "string" },
                  email: { type: "string" },
                  role: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "User updated" },
        },
      },
    },
    "/users/delete-user": {
      delete: {
        tags: ["Users"],
        summary: "Delete user (ADMIN only)",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["id"],
                properties: {
                  id: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "User deleted" },
        },
      },
    },
    "/users/updaterole/{id}": {
      put: {
        tags: ["Users"],
        summary: "Update user role by ID (ADMIN only)",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: { type: "string" },
            required: true,
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["role"],
                properties: {
                  role: {
                    type: "string",
                    enum: ["ADMIN", "STAFF", "STUDENT"],
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Role updated" },
        },
      },
    },

    // ---------- EQUIPMENT ----------
    "/equipment/getallequipment": {
      get: {
        tags: ["Equipment"],
        summary: "Get all equipment (ADMIN & STUDENT)",
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: "List of equipment",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Equipment" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/equipment/getequipmentbyid/{id}": {
      get: {
        tags: ["Equipment"],
        summary: "Get equipment by ID",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Equipment found" },
          404: { description: "Not found" },
        },
      },
    },
    "/equipment/addequipment": {
      post: {
        tags: ["Equipment"],
        summary: "Add equipment (ADMIN only)",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateEquipmentRequest" },
            },
          },
        },
        responses: {
          201: { description: "Equipment added" },
        },
      },
    },
    "/equipment/updateequipment": {
      put: {
        tags: ["Equipment"],
        summary: "Update equipment (ADMIN only)",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                allOf: [
                  { $ref: "#/components/schemas/CreateEquipmentRequest" },
                  {
                    type: "object",
                    required: ["id"],
                    properties: { id: { type: "string" } },
                  },
                ],
              },
            },
          },
        },
        responses: {
          200: { description: "Equipment updated" },
        },
      },
    },
    "/equipment/deleteequipment": {
      delete: {
        tags: ["Equipment"],
        summary: "Delete equipment (ADMIN only)",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["id"],
                properties: {
                  id: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Equipment deleted" },
        },
      },
    },

    // ---------- REQUESTS ----------
    "/requests/getRequests": {
      get: {
        tags: ["Requests"],
        summary: "Get all requests",
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: "List of requests",
          },
        },
      },
    },
    "/requests/getrequestbyid": {
      get: {
        tags: ["Requests"],
        summary: "Get a single request by ID (via query or body as per implementation)",
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: "Request found" },
          404: { description: "Not found" },
        },
      },
    },
    "/requests/createrequest": {
      post: {
        tags: ["Requests"],
        summary: "Create a new borrow request",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateRequestBody" },
            },
          },
        },
        responses: {
          201: { description: "Request created" },
        },
      },
    },
    "/requests/approverequest": {
      put: {
        tags: ["Requests"],
        summary: "Approve request (ADMIN only)",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["id"],
                properties: { id: { type: "string" } },
              },
            },
          },
        },
        responses: {
          200: { description: "Request approved" },
        },
      },
    },
    "/requests/rejectrequest": {
      put: {
        tags: ["Requests"],
        summary: "Reject request (ADMIN only)",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["id"],
                properties: { id: { type: "string" } },
              },
            },
          },
        },
        responses: {
          200: { description: "Request rejected" },
        },
      },
    },
    "/requests/delete-request": {
      delete: {
        tags: ["Requests"],
        summary: "Delete request (Admin or owner, as per middleware)",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["id"],
                properties: { id: { type: "string" } },
              },
            },
          },
        },
        responses: {
          200: { description: "Request deleted" },
        },
      },
    },

    // ---------- LOANS ----------
    "/loans/getLoans": {
      get: {
        tags: ["Loans"],
        summary: "Get all active loans",
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: "List of loans" },
        },
      },
    },
    "/loans/createloan": {
      post: {
        tags: ["Loans"],
        summary: "Create a loan from an approved request (ADMIN)",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateLoanBody" },
            },
          },
        },
        responses: {
          201: { description: "Loan created; original request deleted" },
        },
      },
    },
    "/loans/updateLoan": {
      put: {
        tags: ["Loans"],
        summary: "Update loan details (ADMIN)",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["id"],
                properties: {
                  id: { type: "string" },
                  from: { type: "string", format: "date-time" },
                  to: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Loan updated" },
        },
      },
    },
    "/loans/returnloan": {
      put: {
        tags: ["Loans"],
        summary: "Mark loan as returned (ADMIN)",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["id"],
                properties: { id: { type: "string" } },
              },
            },
          },
        },
        responses: {
          200: { description: "Loan marked as returned" },
        },
      },
    },
    "/loans/deleteLoan": {
      delete: {
        tags: ["Loans"],
        summary: "Delete a loan (ADMIN)",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["id"],
                properties: { id: { type: "string" } },
              },
            },
          },
        },
        responses: {
          200: { description: "Loan deleted" },
        },
      },
    },
  },
};

const options: swaggerJsdoc.Options = {
  definition,
  apis: [], // we're defining everything inline above
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
