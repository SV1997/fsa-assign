import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Loan
 *
 */
export type LoanModel = runtime.Types.Result.DefaultSelection<Prisma.$LoanPayload>;
export type AggregateLoan = {
    _count: LoanCountAggregateOutputType | null;
    _min: LoanMinAggregateOutputType | null;
    _max: LoanMaxAggregateOutputType | null;
};
export type LoanMinAggregateOutputType = {
    id: string | null;
    requestId: string | null;
    equipmentId: string | null;
    borrowerId: string | null;
    from: Date | null;
    to: Date | null;
    returnedAt: Date | null;
    createdAt: Date | null;
};
export type LoanMaxAggregateOutputType = {
    id: string | null;
    requestId: string | null;
    equipmentId: string | null;
    borrowerId: string | null;
    from: Date | null;
    to: Date | null;
    returnedAt: Date | null;
    createdAt: Date | null;
};
export type LoanCountAggregateOutputType = {
    id: number;
    requestId: number;
    equipmentId: number;
    borrowerId: number;
    from: number;
    to: number;
    returnedAt: number;
    createdAt: number;
    _all: number;
};
export type LoanMinAggregateInputType = {
    id?: true;
    requestId?: true;
    equipmentId?: true;
    borrowerId?: true;
    from?: true;
    to?: true;
    returnedAt?: true;
    createdAt?: true;
};
export type LoanMaxAggregateInputType = {
    id?: true;
    requestId?: true;
    equipmentId?: true;
    borrowerId?: true;
    from?: true;
    to?: true;
    returnedAt?: true;
    createdAt?: true;
};
export type LoanCountAggregateInputType = {
    id?: true;
    requestId?: true;
    equipmentId?: true;
    borrowerId?: true;
    from?: true;
    to?: true;
    returnedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type LoanAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Loan to aggregate.
     */
    where?: Prisma.LoanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Loans to fetch.
     */
    orderBy?: Prisma.LoanOrderByWithRelationInput | Prisma.LoanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.LoanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Loans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Loans
    **/
    _count?: true | LoanCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: LoanMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: LoanMaxAggregateInputType;
};
export type GetLoanAggregateType<T extends LoanAggregateArgs> = {
    [P in keyof T & keyof AggregateLoan]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLoan[P]> : Prisma.GetScalarType<T[P], AggregateLoan[P]>;
};
export type LoanGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LoanWhereInput;
    orderBy?: Prisma.LoanOrderByWithAggregationInput | Prisma.LoanOrderByWithAggregationInput[];
    by: Prisma.LoanScalarFieldEnum[] | Prisma.LoanScalarFieldEnum;
    having?: Prisma.LoanScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LoanCountAggregateInputType | true;
    _min?: LoanMinAggregateInputType;
    _max?: LoanMaxAggregateInputType;
};
export type LoanGroupByOutputType = {
    id: string;
    requestId: string;
    equipmentId: string;
    borrowerId: string;
    from: Date;
    to: Date;
    returnedAt: Date | null;
    createdAt: Date;
    _count: LoanCountAggregateOutputType | null;
    _min: LoanMinAggregateOutputType | null;
    _max: LoanMaxAggregateOutputType | null;
};
type GetLoanGroupByPayload<T extends LoanGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LoanGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LoanGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LoanGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LoanGroupByOutputType[P]>;
}>>;
export type LoanWhereInput = {
    AND?: Prisma.LoanWhereInput | Prisma.LoanWhereInput[];
    OR?: Prisma.LoanWhereInput[];
    NOT?: Prisma.LoanWhereInput | Prisma.LoanWhereInput[];
    id?: Prisma.StringFilter<"Loan"> | string;
    requestId?: Prisma.StringFilter<"Loan"> | string;
    equipmentId?: Prisma.StringFilter<"Loan"> | string;
    borrowerId?: Prisma.StringFilter<"Loan"> | string;
    from?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    to?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    returnedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    request?: Prisma.XOR<Prisma.RequestScalarRelationFilter, Prisma.RequestWhereInput>;
    equipment?: Prisma.XOR<Prisma.EquipmentScalarRelationFilter, Prisma.EquipmentWhereInput>;
    borrower?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type LoanOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    borrowerId?: Prisma.SortOrder;
    from?: Prisma.SortOrder;
    to?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    request?: Prisma.RequestOrderByWithRelationInput;
    equipment?: Prisma.EquipmentOrderByWithRelationInput;
    borrower?: Prisma.UserOrderByWithRelationInput;
};
export type LoanWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    requestId?: string;
    AND?: Prisma.LoanWhereInput | Prisma.LoanWhereInput[];
    OR?: Prisma.LoanWhereInput[];
    NOT?: Prisma.LoanWhereInput | Prisma.LoanWhereInput[];
    equipmentId?: Prisma.StringFilter<"Loan"> | string;
    borrowerId?: Prisma.StringFilter<"Loan"> | string;
    from?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    to?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    returnedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    request?: Prisma.XOR<Prisma.RequestScalarRelationFilter, Prisma.RequestWhereInput>;
    equipment?: Prisma.XOR<Prisma.EquipmentScalarRelationFilter, Prisma.EquipmentWhereInput>;
    borrower?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "requestId">;
export type LoanOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    borrowerId?: Prisma.SortOrder;
    from?: Prisma.SortOrder;
    to?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.LoanCountOrderByAggregateInput;
    _max?: Prisma.LoanMaxOrderByAggregateInput;
    _min?: Prisma.LoanMinOrderByAggregateInput;
};
export type LoanScalarWhereWithAggregatesInput = {
    AND?: Prisma.LoanScalarWhereWithAggregatesInput | Prisma.LoanScalarWhereWithAggregatesInput[];
    OR?: Prisma.LoanScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LoanScalarWhereWithAggregatesInput | Prisma.LoanScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Loan"> | string;
    requestId?: Prisma.StringWithAggregatesFilter<"Loan"> | string;
    equipmentId?: Prisma.StringWithAggregatesFilter<"Loan"> | string;
    borrowerId?: Prisma.StringWithAggregatesFilter<"Loan"> | string;
    from?: Prisma.DateTimeWithAggregatesFilter<"Loan"> | Date | string;
    to?: Prisma.DateTimeWithAggregatesFilter<"Loan"> | Date | string;
    returnedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Loan"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Loan"> | Date | string;
};
export type LoanCreateInput = {
    id?: string;
    from: Date | string;
    to: Date | string;
    returnedAt?: Date | string | null;
    createdAt?: Date | string;
    request: Prisma.RequestCreateNestedOneWithoutLoanInput;
    equipment: Prisma.EquipmentCreateNestedOneWithoutLoansInput;
    borrower: Prisma.UserCreateNestedOneWithoutLoansInput;
};
export type LoanUncheckedCreateInput = {
    id?: string;
    requestId: string;
    equipmentId: string;
    borrowerId: string;
    from: Date | string;
    to: Date | string;
    returnedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type LoanUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    from?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    to?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    request?: Prisma.RequestUpdateOneRequiredWithoutLoanNestedInput;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutLoansNestedInput;
    borrower?: Prisma.UserUpdateOneRequiredWithoutLoansNestedInput;
};
export type LoanUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    equipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowerId?: Prisma.StringFieldUpdateOperationsInput | string;
    from?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    to?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanCreateManyInput = {
    id?: string;
    requestId: string;
    equipmentId: string;
    borrowerId: string;
    from: Date | string;
    to: Date | string;
    returnedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type LoanUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    from?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    to?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    equipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowerId?: Prisma.StringFieldUpdateOperationsInput | string;
    from?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    to?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanListRelationFilter = {
    every?: Prisma.LoanWhereInput;
    some?: Prisma.LoanWhereInput;
    none?: Prisma.LoanWhereInput;
};
export type LoanOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LoanNullableScalarRelationFilter = {
    is?: Prisma.LoanWhereInput | null;
    isNot?: Prisma.LoanWhereInput | null;
};
export type LoanCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    borrowerId?: Prisma.SortOrder;
    from?: Prisma.SortOrder;
    to?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type LoanMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    borrowerId?: Prisma.SortOrder;
    from?: Prisma.SortOrder;
    to?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type LoanMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    requestId?: Prisma.SortOrder;
    equipmentId?: Prisma.SortOrder;
    borrowerId?: Prisma.SortOrder;
    from?: Prisma.SortOrder;
    to?: Prisma.SortOrder;
    returnedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type LoanCreateNestedManyWithoutBorrowerInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutBorrowerInput, Prisma.LoanUncheckedCreateWithoutBorrowerInput> | Prisma.LoanCreateWithoutBorrowerInput[] | Prisma.LoanUncheckedCreateWithoutBorrowerInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutBorrowerInput | Prisma.LoanCreateOrConnectWithoutBorrowerInput[];
    createMany?: Prisma.LoanCreateManyBorrowerInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUncheckedCreateNestedManyWithoutBorrowerInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutBorrowerInput, Prisma.LoanUncheckedCreateWithoutBorrowerInput> | Prisma.LoanCreateWithoutBorrowerInput[] | Prisma.LoanUncheckedCreateWithoutBorrowerInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutBorrowerInput | Prisma.LoanCreateOrConnectWithoutBorrowerInput[];
    createMany?: Prisma.LoanCreateManyBorrowerInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUpdateManyWithoutBorrowerNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutBorrowerInput, Prisma.LoanUncheckedCreateWithoutBorrowerInput> | Prisma.LoanCreateWithoutBorrowerInput[] | Prisma.LoanUncheckedCreateWithoutBorrowerInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutBorrowerInput | Prisma.LoanCreateOrConnectWithoutBorrowerInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutBorrowerInput | Prisma.LoanUpsertWithWhereUniqueWithoutBorrowerInput[];
    createMany?: Prisma.LoanCreateManyBorrowerInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutBorrowerInput | Prisma.LoanUpdateWithWhereUniqueWithoutBorrowerInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutBorrowerInput | Prisma.LoanUpdateManyWithWhereWithoutBorrowerInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUncheckedUpdateManyWithoutBorrowerNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutBorrowerInput, Prisma.LoanUncheckedCreateWithoutBorrowerInput> | Prisma.LoanCreateWithoutBorrowerInput[] | Prisma.LoanUncheckedCreateWithoutBorrowerInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutBorrowerInput | Prisma.LoanCreateOrConnectWithoutBorrowerInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutBorrowerInput | Prisma.LoanUpsertWithWhereUniqueWithoutBorrowerInput[];
    createMany?: Prisma.LoanCreateManyBorrowerInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutBorrowerInput | Prisma.LoanUpdateWithWhereUniqueWithoutBorrowerInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutBorrowerInput | Prisma.LoanUpdateManyWithWhereWithoutBorrowerInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanCreateNestedManyWithoutEquipmentInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutEquipmentInput, Prisma.LoanUncheckedCreateWithoutEquipmentInput> | Prisma.LoanCreateWithoutEquipmentInput[] | Prisma.LoanUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutEquipmentInput | Prisma.LoanCreateOrConnectWithoutEquipmentInput[];
    createMany?: Prisma.LoanCreateManyEquipmentInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUncheckedCreateNestedManyWithoutEquipmentInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutEquipmentInput, Prisma.LoanUncheckedCreateWithoutEquipmentInput> | Prisma.LoanCreateWithoutEquipmentInput[] | Prisma.LoanUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutEquipmentInput | Prisma.LoanCreateOrConnectWithoutEquipmentInput[];
    createMany?: Prisma.LoanCreateManyEquipmentInputEnvelope;
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
};
export type LoanUpdateManyWithoutEquipmentNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutEquipmentInput, Prisma.LoanUncheckedCreateWithoutEquipmentInput> | Prisma.LoanCreateWithoutEquipmentInput[] | Prisma.LoanUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutEquipmentInput | Prisma.LoanCreateOrConnectWithoutEquipmentInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutEquipmentInput | Prisma.LoanUpsertWithWhereUniqueWithoutEquipmentInput[];
    createMany?: Prisma.LoanCreateManyEquipmentInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutEquipmentInput | Prisma.LoanUpdateWithWhereUniqueWithoutEquipmentInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutEquipmentInput | Prisma.LoanUpdateManyWithWhereWithoutEquipmentInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanUncheckedUpdateManyWithoutEquipmentNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutEquipmentInput, Prisma.LoanUncheckedCreateWithoutEquipmentInput> | Prisma.LoanCreateWithoutEquipmentInput[] | Prisma.LoanUncheckedCreateWithoutEquipmentInput[];
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutEquipmentInput | Prisma.LoanCreateOrConnectWithoutEquipmentInput[];
    upsert?: Prisma.LoanUpsertWithWhereUniqueWithoutEquipmentInput | Prisma.LoanUpsertWithWhereUniqueWithoutEquipmentInput[];
    createMany?: Prisma.LoanCreateManyEquipmentInputEnvelope;
    set?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    disconnect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    delete?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    connect?: Prisma.LoanWhereUniqueInput | Prisma.LoanWhereUniqueInput[];
    update?: Prisma.LoanUpdateWithWhereUniqueWithoutEquipmentInput | Prisma.LoanUpdateWithWhereUniqueWithoutEquipmentInput[];
    updateMany?: Prisma.LoanUpdateManyWithWhereWithoutEquipmentInput | Prisma.LoanUpdateManyWithWhereWithoutEquipmentInput[];
    deleteMany?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
};
export type LoanCreateNestedOneWithoutRequestInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutRequestInput, Prisma.LoanUncheckedCreateWithoutRequestInput>;
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutRequestInput;
    connect?: Prisma.LoanWhereUniqueInput;
};
export type LoanUncheckedCreateNestedOneWithoutRequestInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutRequestInput, Prisma.LoanUncheckedCreateWithoutRequestInput>;
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutRequestInput;
    connect?: Prisma.LoanWhereUniqueInput;
};
export type LoanUpdateOneWithoutRequestNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutRequestInput, Prisma.LoanUncheckedCreateWithoutRequestInput>;
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutRequestInput;
    upsert?: Prisma.LoanUpsertWithoutRequestInput;
    disconnect?: Prisma.LoanWhereInput | boolean;
    delete?: Prisma.LoanWhereInput | boolean;
    connect?: Prisma.LoanWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LoanUpdateToOneWithWhereWithoutRequestInput, Prisma.LoanUpdateWithoutRequestInput>, Prisma.LoanUncheckedUpdateWithoutRequestInput>;
};
export type LoanUncheckedUpdateOneWithoutRequestNestedInput = {
    create?: Prisma.XOR<Prisma.LoanCreateWithoutRequestInput, Prisma.LoanUncheckedCreateWithoutRequestInput>;
    connectOrCreate?: Prisma.LoanCreateOrConnectWithoutRequestInput;
    upsert?: Prisma.LoanUpsertWithoutRequestInput;
    disconnect?: Prisma.LoanWhereInput | boolean;
    delete?: Prisma.LoanWhereInput | boolean;
    connect?: Prisma.LoanWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.LoanUpdateToOneWithWhereWithoutRequestInput, Prisma.LoanUpdateWithoutRequestInput>, Prisma.LoanUncheckedUpdateWithoutRequestInput>;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type LoanCreateWithoutBorrowerInput = {
    id?: string;
    from: Date | string;
    to: Date | string;
    returnedAt?: Date | string | null;
    createdAt?: Date | string;
    request: Prisma.RequestCreateNestedOneWithoutLoanInput;
    equipment: Prisma.EquipmentCreateNestedOneWithoutLoansInput;
};
export type LoanUncheckedCreateWithoutBorrowerInput = {
    id?: string;
    requestId: string;
    equipmentId: string;
    from: Date | string;
    to: Date | string;
    returnedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type LoanCreateOrConnectWithoutBorrowerInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutBorrowerInput, Prisma.LoanUncheckedCreateWithoutBorrowerInput>;
};
export type LoanCreateManyBorrowerInputEnvelope = {
    data: Prisma.LoanCreateManyBorrowerInput | Prisma.LoanCreateManyBorrowerInput[];
    skipDuplicates?: boolean;
};
export type LoanUpsertWithWhereUniqueWithoutBorrowerInput = {
    where: Prisma.LoanWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoanUpdateWithoutBorrowerInput, Prisma.LoanUncheckedUpdateWithoutBorrowerInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutBorrowerInput, Prisma.LoanUncheckedCreateWithoutBorrowerInput>;
};
export type LoanUpdateWithWhereUniqueWithoutBorrowerInput = {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutBorrowerInput, Prisma.LoanUncheckedUpdateWithoutBorrowerInput>;
};
export type LoanUpdateManyWithWhereWithoutBorrowerInput = {
    where: Prisma.LoanScalarWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyWithoutBorrowerInput>;
};
export type LoanScalarWhereInput = {
    AND?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
    OR?: Prisma.LoanScalarWhereInput[];
    NOT?: Prisma.LoanScalarWhereInput | Prisma.LoanScalarWhereInput[];
    id?: Prisma.StringFilter<"Loan"> | string;
    requestId?: Prisma.StringFilter<"Loan"> | string;
    equipmentId?: Prisma.StringFilter<"Loan"> | string;
    borrowerId?: Prisma.StringFilter<"Loan"> | string;
    from?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    to?: Prisma.DateTimeFilter<"Loan"> | Date | string;
    returnedAt?: Prisma.DateTimeNullableFilter<"Loan"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Loan"> | Date | string;
};
export type LoanCreateWithoutEquipmentInput = {
    id?: string;
    from: Date | string;
    to: Date | string;
    returnedAt?: Date | string | null;
    createdAt?: Date | string;
    request: Prisma.RequestCreateNestedOneWithoutLoanInput;
    borrower: Prisma.UserCreateNestedOneWithoutLoansInput;
};
export type LoanUncheckedCreateWithoutEquipmentInput = {
    id?: string;
    requestId: string;
    borrowerId: string;
    from: Date | string;
    to: Date | string;
    returnedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type LoanCreateOrConnectWithoutEquipmentInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutEquipmentInput, Prisma.LoanUncheckedCreateWithoutEquipmentInput>;
};
export type LoanCreateManyEquipmentInputEnvelope = {
    data: Prisma.LoanCreateManyEquipmentInput | Prisma.LoanCreateManyEquipmentInput[];
    skipDuplicates?: boolean;
};
export type LoanUpsertWithWhereUniqueWithoutEquipmentInput = {
    where: Prisma.LoanWhereUniqueInput;
    update: Prisma.XOR<Prisma.LoanUpdateWithoutEquipmentInput, Prisma.LoanUncheckedUpdateWithoutEquipmentInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutEquipmentInput, Prisma.LoanUncheckedCreateWithoutEquipmentInput>;
};
export type LoanUpdateWithWhereUniqueWithoutEquipmentInput = {
    where: Prisma.LoanWhereUniqueInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutEquipmentInput, Prisma.LoanUncheckedUpdateWithoutEquipmentInput>;
};
export type LoanUpdateManyWithWhereWithoutEquipmentInput = {
    where: Prisma.LoanScalarWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyWithoutEquipmentInput>;
};
export type LoanCreateWithoutRequestInput = {
    id?: string;
    from: Date | string;
    to: Date | string;
    returnedAt?: Date | string | null;
    createdAt?: Date | string;
    equipment: Prisma.EquipmentCreateNestedOneWithoutLoansInput;
    borrower: Prisma.UserCreateNestedOneWithoutLoansInput;
};
export type LoanUncheckedCreateWithoutRequestInput = {
    id?: string;
    equipmentId: string;
    borrowerId: string;
    from: Date | string;
    to: Date | string;
    returnedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type LoanCreateOrConnectWithoutRequestInput = {
    where: Prisma.LoanWhereUniqueInput;
    create: Prisma.XOR<Prisma.LoanCreateWithoutRequestInput, Prisma.LoanUncheckedCreateWithoutRequestInput>;
};
export type LoanUpsertWithoutRequestInput = {
    update: Prisma.XOR<Prisma.LoanUpdateWithoutRequestInput, Prisma.LoanUncheckedUpdateWithoutRequestInput>;
    create: Prisma.XOR<Prisma.LoanCreateWithoutRequestInput, Prisma.LoanUncheckedCreateWithoutRequestInput>;
    where?: Prisma.LoanWhereInput;
};
export type LoanUpdateToOneWithWhereWithoutRequestInput = {
    where?: Prisma.LoanWhereInput;
    data: Prisma.XOR<Prisma.LoanUpdateWithoutRequestInput, Prisma.LoanUncheckedUpdateWithoutRequestInput>;
};
export type LoanUpdateWithoutRequestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    from?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    to?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutLoansNestedInput;
    borrower?: Prisma.UserUpdateOneRequiredWithoutLoansNestedInput;
};
export type LoanUncheckedUpdateWithoutRequestInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    equipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowerId?: Prisma.StringFieldUpdateOperationsInput | string;
    from?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    to?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanCreateManyBorrowerInput = {
    id?: string;
    requestId: string;
    equipmentId: string;
    from: Date | string;
    to: Date | string;
    returnedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type LoanUpdateWithoutBorrowerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    from?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    to?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    request?: Prisma.RequestUpdateOneRequiredWithoutLoanNestedInput;
    equipment?: Prisma.EquipmentUpdateOneRequiredWithoutLoansNestedInput;
};
export type LoanUncheckedUpdateWithoutBorrowerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    equipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    from?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    to?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanUncheckedUpdateManyWithoutBorrowerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    equipmentId?: Prisma.StringFieldUpdateOperationsInput | string;
    from?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    to?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanCreateManyEquipmentInput = {
    id?: string;
    requestId: string;
    borrowerId: string;
    from: Date | string;
    to: Date | string;
    returnedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type LoanUpdateWithoutEquipmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    from?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    to?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    request?: Prisma.RequestUpdateOneRequiredWithoutLoanNestedInput;
    borrower?: Prisma.UserUpdateOneRequiredWithoutLoansNestedInput;
};
export type LoanUncheckedUpdateWithoutEquipmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowerId?: Prisma.StringFieldUpdateOperationsInput | string;
    from?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    to?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanUncheckedUpdateManyWithoutEquipmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    requestId?: Prisma.StringFieldUpdateOperationsInput | string;
    borrowerId?: Prisma.StringFieldUpdateOperationsInput | string;
    from?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    to?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    returnedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LoanSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestId?: boolean;
    equipmentId?: boolean;
    borrowerId?: boolean;
    from?: boolean;
    to?: boolean;
    returnedAt?: boolean;
    createdAt?: boolean;
    request?: boolean | Prisma.RequestDefaultArgs<ExtArgs>;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    borrower?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["loan"]>;
export type LoanSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestId?: boolean;
    equipmentId?: boolean;
    borrowerId?: boolean;
    from?: boolean;
    to?: boolean;
    returnedAt?: boolean;
    createdAt?: boolean;
    request?: boolean | Prisma.RequestDefaultArgs<ExtArgs>;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    borrower?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["loan"]>;
export type LoanSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    requestId?: boolean;
    equipmentId?: boolean;
    borrowerId?: boolean;
    from?: boolean;
    to?: boolean;
    returnedAt?: boolean;
    createdAt?: boolean;
    request?: boolean | Prisma.RequestDefaultArgs<ExtArgs>;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    borrower?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["loan"]>;
export type LoanSelectScalar = {
    id?: boolean;
    requestId?: boolean;
    equipmentId?: boolean;
    borrowerId?: boolean;
    from?: boolean;
    to?: boolean;
    returnedAt?: boolean;
    createdAt?: boolean;
};
export type LoanOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "requestId" | "equipmentId" | "borrowerId" | "from" | "to" | "returnedAt" | "createdAt", ExtArgs["result"]["loan"]>;
export type LoanInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    request?: boolean | Prisma.RequestDefaultArgs<ExtArgs>;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    borrower?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type LoanIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    request?: boolean | Prisma.RequestDefaultArgs<ExtArgs>;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    borrower?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type LoanIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    request?: boolean | Prisma.RequestDefaultArgs<ExtArgs>;
    equipment?: boolean | Prisma.EquipmentDefaultArgs<ExtArgs>;
    borrower?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $LoanPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Loan";
    objects: {
        request: Prisma.$RequestPayload<ExtArgs>;
        equipment: Prisma.$EquipmentPayload<ExtArgs>;
        borrower: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        requestId: string;
        equipmentId: string;
        borrowerId: string;
        from: Date;
        to: Date;
        returnedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["loan"]>;
    composites: {};
};
export type LoanGetPayload<S extends boolean | null | undefined | LoanDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LoanPayload, S>;
export type LoanCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LoanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LoanCountAggregateInputType | true;
};
export interface LoanDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Loan'];
        meta: {
            name: 'Loan';
        };
    };
    /**
     * Find zero or one Loan that matches the filter.
     * @param {LoanFindUniqueArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LoanFindUniqueArgs>(args: Prisma.SelectSubset<T, LoanFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Loan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LoanFindUniqueOrThrowArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LoanFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LoanFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Loan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindFirstArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LoanFindFirstArgs>(args?: Prisma.SelectSubset<T, LoanFindFirstArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Loan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindFirstOrThrowArgs} args - Arguments to find a Loan
     * @example
     * // Get one Loan
     * const loan = await prisma.loan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LoanFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LoanFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Loans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Loans
     * const loans = await prisma.loan.findMany()
     *
     * // Get first 10 Loans
     * const loans = await prisma.loan.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const loanWithIdOnly = await prisma.loan.findMany({ select: { id: true } })
     *
     */
    findMany<T extends LoanFindManyArgs>(args?: Prisma.SelectSubset<T, LoanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Loan.
     * @param {LoanCreateArgs} args - Arguments to create a Loan.
     * @example
     * // Create one Loan
     * const Loan = await prisma.loan.create({
     *   data: {
     *     // ... data to create a Loan
     *   }
     * })
     *
     */
    create<T extends LoanCreateArgs>(args: Prisma.SelectSubset<T, LoanCreateArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Loans.
     * @param {LoanCreateManyArgs} args - Arguments to create many Loans.
     * @example
     * // Create many Loans
     * const loan = await prisma.loan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends LoanCreateManyArgs>(args?: Prisma.SelectSubset<T, LoanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Loans and returns the data saved in the database.
     * @param {LoanCreateManyAndReturnArgs} args - Arguments to create many Loans.
     * @example
     * // Create many Loans
     * const loan = await prisma.loan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Loans and only return the `id`
     * const loanWithIdOnly = await prisma.loan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends LoanCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LoanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Loan.
     * @param {LoanDeleteArgs} args - Arguments to delete one Loan.
     * @example
     * // Delete one Loan
     * const Loan = await prisma.loan.delete({
     *   where: {
     *     // ... filter to delete one Loan
     *   }
     * })
     *
     */
    delete<T extends LoanDeleteArgs>(args: Prisma.SelectSubset<T, LoanDeleteArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Loan.
     * @param {LoanUpdateArgs} args - Arguments to update one Loan.
     * @example
     * // Update one Loan
     * const loan = await prisma.loan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends LoanUpdateArgs>(args: Prisma.SelectSubset<T, LoanUpdateArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Loans.
     * @param {LoanDeleteManyArgs} args - Arguments to filter Loans to delete.
     * @example
     * // Delete a few Loans
     * const { count } = await prisma.loan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends LoanDeleteManyArgs>(args?: Prisma.SelectSubset<T, LoanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Loans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Loans
     * const loan = await prisma.loan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends LoanUpdateManyArgs>(args: Prisma.SelectSubset<T, LoanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Loans and returns the data updated in the database.
     * @param {LoanUpdateManyAndReturnArgs} args - Arguments to update many Loans.
     * @example
     * // Update many Loans
     * const loan = await prisma.loan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Loans and only return the `id`
     * const loanWithIdOnly = await prisma.loan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends LoanUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LoanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Loan.
     * @param {LoanUpsertArgs} args - Arguments to update or create a Loan.
     * @example
     * // Update or create a Loan
     * const loan = await prisma.loan.upsert({
     *   create: {
     *     // ... data to create a Loan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Loan we want to update
     *   }
     * })
     */
    upsert<T extends LoanUpsertArgs>(args: Prisma.SelectSubset<T, LoanUpsertArgs<ExtArgs>>): Prisma.Prisma__LoanClient<runtime.Types.Result.GetResult<Prisma.$LoanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Loans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanCountArgs} args - Arguments to filter Loans to count.
     * @example
     * // Count the number of Loans
     * const count = await prisma.loan.count({
     *   where: {
     *     // ... the filter for the Loans we want to count
     *   }
     * })
    **/
    count<T extends LoanCountArgs>(args?: Prisma.Subset<T, LoanCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LoanCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Loan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LoanAggregateArgs>(args: Prisma.Subset<T, LoanAggregateArgs>): Prisma.PrismaPromise<GetLoanAggregateType<T>>;
    /**
     * Group by Loan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LoanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends LoanGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LoanGroupByArgs['orderBy'];
    } : {
        orderBy?: LoanGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LoanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLoanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Loan model
     */
    readonly fields: LoanFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Loan.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__LoanClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    request<T extends Prisma.RequestDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RequestDefaultArgs<ExtArgs>>): Prisma.Prisma__RequestClient<runtime.Types.Result.GetResult<Prisma.$RequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    equipment<T extends Prisma.EquipmentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EquipmentDefaultArgs<ExtArgs>>): Prisma.Prisma__EquipmentClient<runtime.Types.Result.GetResult<Prisma.$EquipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    borrower<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Loan model
 */
export interface LoanFieldRefs {
    readonly id: Prisma.FieldRef<"Loan", 'String'>;
    readonly requestId: Prisma.FieldRef<"Loan", 'String'>;
    readonly equipmentId: Prisma.FieldRef<"Loan", 'String'>;
    readonly borrowerId: Prisma.FieldRef<"Loan", 'String'>;
    readonly from: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly to: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly returnedAt: Prisma.FieldRef<"Loan", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Loan", 'DateTime'>;
}
/**
 * Loan findUnique
 */
export type LoanFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter, which Loan to fetch.
     */
    where: Prisma.LoanWhereUniqueInput;
};
/**
 * Loan findUniqueOrThrow
 */
export type LoanFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter, which Loan to fetch.
     */
    where: Prisma.LoanWhereUniqueInput;
};
/**
 * Loan findFirst
 */
export type LoanFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter, which Loan to fetch.
     */
    where?: Prisma.LoanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Loans to fetch.
     */
    orderBy?: Prisma.LoanOrderByWithRelationInput | Prisma.LoanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Loans.
     */
    cursor?: Prisma.LoanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Loans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Loans.
     */
    distinct?: Prisma.LoanScalarFieldEnum | Prisma.LoanScalarFieldEnum[];
};
/**
 * Loan findFirstOrThrow
 */
export type LoanFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter, which Loan to fetch.
     */
    where?: Prisma.LoanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Loans to fetch.
     */
    orderBy?: Prisma.LoanOrderByWithRelationInput | Prisma.LoanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Loans.
     */
    cursor?: Prisma.LoanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Loans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Loans.
     */
    distinct?: Prisma.LoanScalarFieldEnum | Prisma.LoanScalarFieldEnum[];
};
/**
 * Loan findMany
 */
export type LoanFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter, which Loans to fetch.
     */
    where?: Prisma.LoanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Loans to fetch.
     */
    orderBy?: Prisma.LoanOrderByWithRelationInput | Prisma.LoanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Loans.
     */
    cursor?: Prisma.LoanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Loans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Loans.
     */
    skip?: number;
    distinct?: Prisma.LoanScalarFieldEnum | Prisma.LoanScalarFieldEnum[];
};
/**
 * Loan create
 */
export type LoanCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * The data needed to create a Loan.
     */
    data: Prisma.XOR<Prisma.LoanCreateInput, Prisma.LoanUncheckedCreateInput>;
};
/**
 * Loan createMany
 */
export type LoanCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Loans.
     */
    data: Prisma.LoanCreateManyInput | Prisma.LoanCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Loan createManyAndReturn
 */
export type LoanCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * The data used to create many Loans.
     */
    data: Prisma.LoanCreateManyInput | Prisma.LoanCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Loan update
 */
export type LoanUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * The data needed to update a Loan.
     */
    data: Prisma.XOR<Prisma.LoanUpdateInput, Prisma.LoanUncheckedUpdateInput>;
    /**
     * Choose, which Loan to update.
     */
    where: Prisma.LoanWhereUniqueInput;
};
/**
 * Loan updateMany
 */
export type LoanUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Loans.
     */
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyInput>;
    /**
     * Filter which Loans to update
     */
    where?: Prisma.LoanWhereInput;
    /**
     * Limit how many Loans to update.
     */
    limit?: number;
};
/**
 * Loan updateManyAndReturn
 */
export type LoanUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * The data used to update Loans.
     */
    data: Prisma.XOR<Prisma.LoanUpdateManyMutationInput, Prisma.LoanUncheckedUpdateManyInput>;
    /**
     * Filter which Loans to update
     */
    where?: Prisma.LoanWhereInput;
    /**
     * Limit how many Loans to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Loan upsert
 */
export type LoanUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * The filter to search for the Loan to update in case it exists.
     */
    where: Prisma.LoanWhereUniqueInput;
    /**
     * In case the Loan found by the `where` argument doesn't exist, create a new Loan with this data.
     */
    create: Prisma.XOR<Prisma.LoanCreateInput, Prisma.LoanUncheckedCreateInput>;
    /**
     * In case the Loan was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.LoanUpdateInput, Prisma.LoanUncheckedUpdateInput>;
};
/**
 * Loan delete
 */
export type LoanDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
    /**
     * Filter which Loan to delete.
     */
    where: Prisma.LoanWhereUniqueInput;
};
/**
 * Loan deleteMany
 */
export type LoanDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Loans to delete
     */
    where?: Prisma.LoanWhereInput;
    /**
     * Limit how many Loans to delete.
     */
    limit?: number;
};
/**
 * Loan without action
 */
export type LoanDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Loan
     */
    select?: Prisma.LoanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Loan
     */
    omit?: Prisma.LoanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LoanInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Loan.d.ts.map