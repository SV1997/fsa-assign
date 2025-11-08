export declare const Role: {
    readonly STUDENT: "STUDENT";
    readonly STAFF: "STAFF";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const RequestStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
    readonly ISSUED: "ISSUED";
    readonly RETURNED: "RETURNED";
};
export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus];
//# sourceMappingURL=enums.d.ts.map