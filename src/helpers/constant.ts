export const GstRegTypesList: { label: string, value: string }[] = [
    {
        "label": "Regular",
        "value": "regular"
    },
    {
        "label": "Composition",
        "value": "composition_scheme"
    },
    {
        "label": "Casual Taxable Person",
        "value": "casual_taxable_person"
    },
    {
        "label": "Non-Resident",
        "value": "non_resident_taxable_person"
    },
    {
        "label": "ISD (Input Service Distributor)",
        "value": "input_service_distributor"
    },
    {
        "label": "TDS/TCS",
        "value": "tds_tcs"
    },
    {
        "label": "E-Commerce Operator (ECO)",
        "value": "e_commerce_operator"
    },
    {
        "label": "UN Body / UIN Holder",
        "value": "uin"
    }
]

export const parentGroupList: { label: string, value: string }[] = [
    {
        "label": "Zeesh Group",
        "value": "zeesh_group"
    },
    {
        "label": "Textile Holdings",
        "value": "textile_holdings"
    },
    {
        "label": "Fabric Enterprises",
        "value": "fabric_enterprises"
    },
    {
        "label": "Cloth Manufacturers",
        "value": "cloth_manufacturers"
    }
]

export const businessNutureList: { label: string, value: string }[] = [
    {
        "label": "Manufacturer",
        "value": "manufacturer"
    },
    {
        "label": "Wholesaler",
        "value": "wholesaler"
    },
    {
        "label": "Retailer",
        "value": "retailer"
    },
    {
        "label": "Service Provider",
        "value": "service_provider"
    }
]

export const newCustomerDefaultValues = {
    profileImageUrl: undefined,
    profileImageFile: undefined,
    gstRegType: "regular",
    gstNo: "27ABCDE1234F1Z5",
    panNo: "ABCDE1234F",
    legalName: "Zeesh Textiles Pvt Ltd",
    nickName: "Zeesh Textiles",
    parentGroup: "zeesh_group",
    websiteUrl: "https://www.xyz.com",
    msmeNumber: "UDYAM-MH-05-0012345",
    businessExecutor: "manufacturer",
    businessDesc: "We manufacture high-quality textiles.",
    contactName: "Ankit Kumar",
    countryCode: "+91",
    phoneNumber: "9876502090",
    email: "ankit.kumar@gmail.com",
    department: "UDYAM-MH-05-0012345",
    addresses: [
        {
            type: "Billing",
            street: "123 Commercial Street, Near City Center",
            city: "Mumbai",
            country: "India",
            zip: "400001",
            isEditable: true,
        },
        {
            type: "Shipping",
            street: "Plot No. 50, MIDC Industrial Area",
            city: "Surat",
            country: "India",
            zip: "395006",
            isEditable: false,
        },
    ],
    bankAccounts: [
        {
            bankName: "HDFC Bank",
            accountNumber: "50100123456789",
            ifscCode: "HDFC0000123",
            micrNumber: "400020002",
        },
        {
            bankName: "State Bank of India",
            accountNumber: "30012345678",
            ifscCode: "SBIN0000123",
            micrNumber: "110002005",
        },
    ],
    tdsDeduction: true,
    tdsApplication: true,
    gstinNo: "27ABCDE1234F1Z5",
    tdsAccNo: "UDYAN PAN 12 0001234",
    tdsApplyDropdown: "Company",
    ignoreTdsExemption: false,
    ignoreTcsExemption: true,
    tdsApplicationDup: true,
    deducteeTypeAuto: "Company",
    tdsDeducteeType: "Company",
    tanNumber: "MUMB00001A",
    iecNumber: "UDYAM-MH-05-0012345",
    creditLimit: "100000",
    commissionPct: "5.0",
    ageOfInvoice: "30",
    priceList: "Standard Price List",
    agentBrokerName: "Anil Sharma",
    commissionType: "Percentage",
    defaultCurrency: "INR",
};

// export const newCustomerDefaultValues = {
//     profileImageUrl: undefined,
//     profileImageFile: undefined,
//     gstRegType: "",
//     gstNo: "",
//     panNo: "",
//     legalName: "",
//     nickName: "",
//     parentGroup: "",
//     websiteUrl: "",
//     msmeNumber: "",
//     businessExecutor: "",
//     businessDesc: "",
//     contactName: "",
//     countryCode: "",
//     phoneNumber: "",
//     email: "",
//     department: "",

//     addresses: [
//         {
//             type: "Billing",
//             street: "",
//             city: "",
//             country: "",
//             zip: "",
//             isEditable: true,
//         },

//     ],

//     bankAccounts: [
//         {
//             bankName: "",
//             accountNumber: "",
//             ifscCode: "",
//             micrNumber: "",
//         },
//     ],

//     tdsDeduction: false,
//     tdsApplication: false,
//     gstinNo: "",
//     tdsAccNo: "",
//     tdsApplyDropdown: "",
//     ignoreTdsExemption: false,
//     ignoreTcsExemption: false,
//     tdsApplicationDup: false,
//     deducteeTypeAuto: "",
//     tdsDeducteeType: "",
//     tanNumber: "",
//     iecNumber: "",

//     creditLimit: "",
//     commissionPct: "",
//     ageOfInvoice: "",
//     priceList: "",
//     agentBrokerName: "",
//     commissionType: "",
//     defaultCurrency: "",
// };


export const countryCodeList = [
    { label: "+91", value: "+91" },
    { label: "+86", value: "+86" },
    { label: "+65", value: "+65" },
    { label: "+81", value: "+81" },
    { label: "+82", value: "+82" },
    { label: "+62", value: "+62" },
    { label: "+63", value: "+63" },
    { label: "+971", value: "+971" },
    { label: "+92", value: "+92" },
];

export const STORAGE_KEY = "customerFormDraft";