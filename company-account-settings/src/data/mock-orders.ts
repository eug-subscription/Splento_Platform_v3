import type { Order, OrderListItem } from '../types/order.types';

export const mockOrders: Order[] = [
    {
        id: 'ord_001',
        displayId: 'ORD-2025-0001',
        status: 'delivered',
        type: 'photo',
        clientId: 'client_001',
        clientName: 'Acme Corporation',
        session: {
            date: '2025-01-15',
            time: '10:00',
            duration: 120,
            timezone: 'Europe/London',
            deliverables: 50
        },
        location: {
            type: 'on_site',
            venueName: 'Acme HQ',
            address: '123 Business Street',
            city: 'London',
            country: 'United Kingdom',
            postalCode: 'EC1A 1BB',
            contactPerson: 'John Smith',
            contactPhone: '+44 20 1234 5678',
            notes: 'Reception on ground floor'
        },
        brief: {
            description: 'Corporate headshots for 25 team members. Professional, modern style.',
            references: [
                { id: 'ref_001', type: 'url', url: 'https://example.com/style-guide.pdf', label: 'Style Guide' }
            ],
            approvalStatus: 'approved',
            approvedAt: '2025-01-10T14:30:00Z',
            approvedBy: 'John Smith'
        },
        gallery: {
            status: 'delivered',
            totalAssets: 50,
            acceptedAssets: 48,
            rejectedAssets: 2,
            pendingAssets: 0,
            deliveredAt: '2025-01-20T16:00:00Z',
            expiresAt: '2025-02-20T16:00:00Z'
        },
        assets: [], // Populated separately in future phases if needed
        revisions: [],
        billing: {
            subtotal: 1500,
            discount: 150,
            tax: 270,
            total: 1620,
            currency: 'GBP',
            paymentStatus: 'paid',
            paidAt: '2025-01-05T10:00:00Z',
            invoiceUrl: 'https://example.com/invoices/INV-2025-0001.pdf',
            lineItems: [
                { id: 'li_001', description: 'Corporate Photography - 2 hours', quantity: 1, unitPrice: 1200, total: 1200 },
                { id: 'li_002', description: 'Express Editing', quantity: 1, unitPrice: 300, total: 300 }
            ]
        },
        assignedTo: {
            id: 'pro_001',
            name: 'Sarah Johnson',
            avatarUrl: null,
            specialty: 'Corporate Photography'
        },
        auditLog: [
            {
                id: 'audit_001',
                timestamp: '2025-01-05T09:00:00Z',
                action: 'Order created',
                actor: { id: 'client_001', name: 'John Smith', avatarUrl: null, type: 'user' },
                metadata: null
            }
        ],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2025-01-05T09:00:00Z',
        updatedAt: '2025-01-20T16:00:00Z'
    },
    {
        id: 'ord_002',
        displayId: 'ORD-2025-0002',
        status: 'in_progress',
        type: 'video',
        clientId: 'client_001',
        clientName: 'StartUp Inc',
        session: {
            date: '2026-03-10',
            time: '14:00',
            duration: 240,
            timezone: 'Europe/London',
            deliverables: 1
        },
        location: {
            type: 'on_site',
            venueName: 'Tech Hub',
            address: '45 Innovation Way',
            city: 'Manchester',
            country: 'United Kingdom',
            postalCode: 'M1 4BT',
            contactPerson: 'Alice Doe',
            contactPhone: '+44 77 0090 0000',
            notes: null
        },
        brief: {
            description: 'Promotional video for new product launch.',
            references: [],
            approvalStatus: 'approved',
            approvedAt: '2026-02-28T10:00:00Z',
            approvedBy: 'Alice Doe'
        },
        gallery: {
            status: 'pending',
            totalAssets: 0,
            acceptedAssets: 0,
            rejectedAssets: 0,
            pendingAssets: 0,
            deliveredAt: null,
            expiresAt: null
        },
        assets: [],
        revisions: [],
        billing: {
            subtotal: 2500,
            discount: 0,
            tax: 500,
            total: 3000,
            currency: 'GBP',
            paymentStatus: 'paid',
            paidAt: '2026-02-25T11:00:00Z',
            invoiceUrl: null,
            lineItems: [
                { id: 'li_003', description: 'Videography - Half Day', quantity: 1, unitPrice: 2500, total: 2500 }
            ]
        },
        assignedTo: {
            id: 'pro_002',
            name: 'Mike Video',
            avatarUrl: null,
            specialty: 'Promotional Video'
        },
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2026-02-25T11:00:00Z',
        updatedAt: '2026-03-01T10:00:00Z'
    },
    {
        id: 'ord_003',
        displayId: 'ORD-2025-0003',
        status: 'review',
        type: 'hybrid',
        clientId: 'client_002',
        clientName: 'Global Corp',
        session: {
            date: '2026-01-05',
            time: '09:00',
            duration: 480,
            timezone: 'Europe/Paris',
            deliverables: 100
        },
        location: {
            type: 'on_site',
            venueName: 'Paris Office',
            address: '10 Rue de la Paix',
            city: 'Paris',
            country: 'France',
            postalCode: '75002',
            contactPerson: 'Jean Pierre',
            contactPhone: null,
            notes: 'Entry code: 1234'
        },
        brief: {
            description: 'Event coverage and interviews.',
            references: [],
            approvalStatus: 'approved',
            approvedAt: '2025-12-20T09:00:00Z',
            approvedBy: 'Jean Pierre'
        },
        gallery: {
            status: 'ready',
            totalAssets: 150,
            acceptedAssets: 0,
            rejectedAssets: 0,
            pendingAssets: 150,
            deliveredAt: '2026-01-07T09:00:00Z',
            expiresAt: '2026-02-07T09:00:00Z'
        },
        assets: [],
        revisions: [],
        billing: {
            subtotal: 4000,
            discount: 0,
            tax: 800,
            total: 4800,
            currency: 'EUR',
            paymentStatus: 'pending',
            paidAt: null,
            invoiceUrl: null,
            lineItems: [
                { id: 'li_004', description: 'Full Day Hybrid Coverage', quantity: 1, unitPrice: 4000, total: 4000 }
            ]
        },
        assignedTo: {
            id: 'pro_003',
            name: 'Emma Hybrid',
            avatarUrl: null,
            specialty: 'Events'
        },
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2025-12-15T15:00:00Z',
        updatedAt: '2026-01-07T09:00:00Z'
    },
    {
        id: 'ord_004',
        displayId: 'ORD-2025-0004',
        status: 'confirmed',
        type: 'ai',
        clientId: 'client_003',
        clientName: 'Tech Start',
        session: {
            date: null,
            time: null,
            duration: 0,
            timezone: 'UTC',
            deliverables: 10
        },
        location: {
            type: 'remote',
            venueName: null,
            address: null,
            city: null,
            country: null,
            postalCode: null,
            contactPerson: 'AI Lead',
            contactPhone: null,
            notes: null
        },
        brief: {
            description: 'AI generated product backgrounds.',
            references: [],
            approvalStatus: 'pending',
            approvedAt: null,
            approvedBy: null
        },
        gallery: null,
        assets: [],
        revisions: [],
        billing: {
            subtotal: 500,
            discount: 0,
            tax: 100,
            total: 600,
            currency: 'USD',
            paymentStatus: 'paid',
            paidAt: '2026-01-06T12:00:00Z',
            invoiceUrl: null,
            lineItems: [
                { id: 'li_005', description: 'AI Generation Package', quantity: 1, unitPrice: 500, total: 500 }
            ]
        },
        assignedTo: null,
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2026-01-06T12:00:00Z',
        updatedAt: '2026-01-06T12:00:00Z'
    },
    {
        id: 'ord_005',
        displayId: 'ORD-2025-0005',
        status: 'pending_confirmation',
        type: 'photo',
        clientId: 'client_001',
        clientName: 'Acme Corporation',
        session: {
            date: '2026-04-01',
            time: '09:00',
            duration: 60,
            timezone: 'Europe/London',
            deliverables: 5
        },
        location: {
            type: 'on_site',
            venueName: 'Acme HQ',
            address: '123 Business Street',
            city: 'London',
            country: 'United Kingdom',
            postalCode: 'EC1A 1BB',
            contactPerson: 'John Smith',
            contactPhone: null,
            notes: null
        },
        brief: {
            description: 'New hire headshots.',
            references: [],
            approvalStatus: 'pending',
            approvedAt: null,
            approvedBy: null
        },
        gallery: null,
        assets: [],
        revisions: [],
        billing: {
            subtotal: 300,
            discount: 0,
            tax: 60,
            total: 360,
            currency: 'GBP',
            paymentStatus: 'pending',
            paidAt: null,
            invoiceUrl: null,
            lineItems: [
                { id: 'li_006', description: 'Headshot Session', quantity: 1, unitPrice: 300, total: 300 }
            ]
        },
        assignedTo: null,
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2026-01-07T08:00:00Z',
        updatedAt: '2026-01-07T08:00:00Z'
    },
    {
        id: 'ord_006',
        displayId: 'ORD-2025-0006',
        status: 'cancelled',
        type: 'video',
        clientId: 'client_004',
        clientName: 'Event Co',
        session: {
            date: '2025-12-01',
            time: '18:00',
            duration: 180,
            timezone: 'Europe/London',
            deliverables: 1
        },
        location: {
            type: 'on_site',
            venueName: 'Grand Hall',
            address: 'Town Centre',
            city: 'Leeds',
            country: 'United Kingdom',
            postalCode: 'LS1 1AA',
            contactPerson: null,
            contactPhone: null,
            notes: null
        },
        brief: {
            description: 'Cancelled due to bad weather.',
            references: [],
            approvalStatus: 'pending',
            approvedAt: null,
            approvedBy: null
        },
        gallery: null,
        assets: [],
        revisions: [],
        billing: {
            subtotal: 0,
            discount: 0,
            tax: 0,
            total: 0,
            currency: 'GBP',
            paymentStatus: 'refunded',
            paidAt: '2025-11-20T10:00:00Z',
            invoiceUrl: null,
            lineItems: []
        },
        assignedTo: null,
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2025-11-20T10:00:00Z',
        updatedAt: '2025-11-25T10:00:00Z'
    },
    {
        id: 'ord_007',
        displayId: 'ORD-2025-0007',
        status: 'editing',
        type: 'photo',
        clientId: 'client_005',
        clientName: 'Fashion Brand',
        session: {
            date: '2026-01-02',
            time: '08:00',
            duration: 480,
            timezone: 'Europe/Milan',
            deliverables: 200
        },
        location: {
            type: 'on_site',
            venueName: 'Studio 54',
            address: 'Via della Spiga',
            city: 'Milan',
            country: 'Italy',
            postalCode: '20121',
            contactPerson: 'Marco',
            contactPhone: null,
            notes: null
        },
        brief: {
            description: 'Spring collection catalog.',
            references: [],
            approvalStatus: 'approved',
            approvedAt: '2025-12-10T10:00:00Z',
            approvedBy: 'Marco'
        },
        gallery: {
            status: 'processing',
            totalAssets: 0,
            acceptedAssets: 0,
            rejectedAssets: 0,
            pendingAssets: 0,
            deliveredAt: null,
            expiresAt: null
        },
        assets: [],
        revisions: [],
        billing: {
            subtotal: 5000,
            discount: 500,
            tax: 1000,
            total: 5500,
            currency: 'EUR',
            paymentStatus: 'paid',
            paidAt: '2025-12-15T12:00:00Z',
            invoiceUrl: null,
            lineItems: [
                { id: 'li_007', description: 'Full Day Studio Shoot', quantity: 1, unitPrice: 5000, total: 5000 }
            ]
        },
        assignedTo: {
            id: 'pro_004',
            name: 'Luigi Photo',
            avatarUrl: null,
            specialty: 'Fashion'
        },
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2025-12-10T10:00:00Z',
        updatedAt: '2026-01-03T18:00:00Z'
    },
    {
        id: 'ord_008',
        displayId: 'ORD-2025-0008',
        status: 'scheduled',
        type: 'hybrid',
        clientId: 'client_006',
        clientName: 'Real Estate Pros',
        session: {
            date: '2026-01-15',
            time: '11:00',
            duration: 90,
            timezone: 'Europe/London',
            deliverables: 20
        },
        location: {
            type: 'on_site',
            venueName: 'Luxury Apartment',
            address: '10 Downing Street',
            city: 'London',
            country: 'United Kingdom',
            postalCode: 'SW1A 2AA',
            contactPerson: 'Agent Smith',
            contactPhone: null,
            notes: null
        },
        brief: {
            description: 'Property listing photos and walkthrough video.',
            references: [],
            approvalStatus: 'approved',
            approvedAt: '2026-01-05T09:00:00Z',
            approvedBy: 'Agent Smith'
        },
        gallery: null,
        assets: [],
        revisions: [],
        billing: {
            subtotal: 450,
            discount: 0,
            tax: 90,
            total: 540,
            currency: 'GBP',
            paymentStatus: 'paid',
            paidAt: '2026-01-05T09:30:00Z',
            invoiceUrl: null,
            lineItems: [
                { id: 'li_008', description: 'Real Estate Package', quantity: 1, unitPrice: 450, total: 450 }
            ]
        },
        assignedTo: {
            id: 'pro_005',
            name: 'Bob Builder',
            avatarUrl: null,
            specialty: 'Real Estate'
        },
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2026-01-05T09:00:00Z',
        updatedAt: '2026-01-05T10:00:00Z'
    },
    {
        id: 'ord_009',
        displayId: 'ORD-2025-0009',
        status: 'draft',
        type: 'photo',
        clientId: 'client_001',
        clientName: 'Acme Corporation',
        session: {
            date: null,
            time: null,
            duration: 0,
            timezone: 'Europe/London',
            deliverables: null
        },
        location: {
            type: 'on_site',
            venueName: null,
            address: null,
            city: null,
            country: null,
            postalCode: null,
            contactPerson: null,
            contactPhone: null,
            notes: null
        },
        brief: {
            description: null,
            references: [],
            approvalStatus: 'pending',
            approvedAt: null,
            approvedBy: null
        },
        gallery: null,
        assets: [],
        revisions: [],
        billing: {
            subtotal: 0,
            discount: 0,
            tax: 0,
            total: 0,
            currency: 'GBP',
            paymentStatus: 'pending',
            paidAt: null,
            invoiceUrl: null,
            lineItems: []
        },
        assignedTo: null,
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2026-01-07T10:00:00Z',
        updatedAt: '2026-01-07T10:00:00Z'
    },
    {
        id: 'ord_010',
        displayId: 'ORD-2025-0010',
        status: 'completed',
        type: 'photo',
        clientId: 'client_007',
        clientName: 'Local Bakery',
        session: {
            date: '2025-11-15',
            time: '08:00',
            duration: 120,
            timezone: 'Europe/London',
            deliverables: 30
        },
        location: {
            type: 'on_site',
            venueName: 'The Bakery',
            address: 'High Street',
            city: 'Oxford',
            country: 'United Kingdom',
            postalCode: 'OX1 1AA',
            contactPerson: 'Baker Joe',
            contactPhone: null,
            notes: null
        },
        brief: {
            description: 'Product photos of new bread line.',
            references: [],
            approvalStatus: 'approved',
            approvedAt: '2025-11-01T10:00:00Z',
            approvedBy: 'Baker Joe'
        },
        gallery: {
            status: 'delivered',
            totalAssets: 35,
            acceptedAssets: 35,
            rejectedAssets: 0,
            pendingAssets: 0,
            deliveredAt: '2025-11-20T10:00:00Z',
            expiresAt: '2025-12-20T10:00:00Z'
        },
        assets: [],
        revisions: [],
        billing: {
            subtotal: 400,
            discount: 0,
            tax: 80,
            total: 480,
            currency: 'GBP',
            paymentStatus: 'paid',
            paidAt: '2025-11-01T10:00:00Z',
            invoiceUrl: null,
            lineItems: [
                { id: 'li_009', description: 'Food Photography', quantity: 1, unitPrice: 400, total: 400 }
            ]
        },
        assignedTo: {
            id: 'pro_006',
            name: 'Foodie Phil',
            avatarUrl: null,
            specialty: 'Food'
        },
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2025-11-01T10:00:00Z',
        updatedAt: '2025-11-25T09:00:00Z'
    },
    {
        id: 'ord_011',
        displayId: 'ORD-2025-0011',
        status: 'revision_requested',
        type: 'photo',
        clientId: 'client_001',
        clientName: 'Acme Corporation',
        session: {
            date: '2025-12-10',
            time: '14:00',
            duration: 120,
            timezone: 'Europe/London',
            deliverables: 40
        },
        location: {
            type: 'on_site',
            venueName: 'Acme Warehouse',
            address: 'Industrial Estate',
            city: 'Birmingham',
            country: 'United Kingdom',
            postalCode: 'B1 1AA',
            contactPerson: 'Warehouse Mgr',
            contactPhone: null,
            notes: null
        },
        brief: {
            description: 'Facility photos.',
            references: [],
            approvalStatus: 'approved',
            approvedAt: '2025-12-01T10:00:00Z',
            approvedBy: 'John Smith'
        },
        gallery: {
            status: 'ready',
            totalAssets: 45,
            acceptedAssets: 20,
            rejectedAssets: 5,
            pendingAssets: 20,
            deliveredAt: '2025-12-15T10:00:00Z',
            expiresAt: '2026-01-15T10:00:00Z'
        },
        assets: [],
        revisions: [
            {
                id: 'rev_001',
                requestedAt: '2025-12-16T10:00:00Z',
                requestedBy: 'John Smith',
                description: 'Please retouch the floor markings.',
                assetIds: ['asset_001', 'asset_002'],
                status: 'pending',
                completedAt: null
            }
        ],
        billing: {
            subtotal: 600,
            discount: 0,
            tax: 120,
            total: 720,
            currency: 'GBP',
            paymentStatus: 'paid',
            paidAt: '2025-12-01T10:00:00Z',
            invoiceUrl: null,
            lineItems: [
                { id: 'li_010', description: 'Industrial Photography', quantity: 1, unitPrice: 600, total: 600 }
            ]
        },
        assignedTo: {
            id: 'pro_007',
            name: 'Indy Lens',
            avatarUrl: null,
            specialty: 'Industrial'
        },
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2025-12-01T10:00:00Z',
        updatedAt: '2025-12-16T10:00:00Z'
    },
    {
        id: 'ord_012',
        displayId: 'ORD-2025-0012',
        status: 'refunded',
        type: 'ai',
        clientId: 'client_008',
        clientName: 'Unhappy Customer',
        session: {
            date: null,
            time: null,
            duration: 0,
            timezone: 'UTC',
            deliverables: 5
        },
        location: {
            type: 'remote',
            venueName: null,
            address: null,
            city: null,
            country: null,
            postalCode: null,
            contactPerson: null,
            contactPhone: null,
            notes: null
        },
        brief: {
            description: 'AI Avatars',
            references: [],
            approvalStatus: 'approved',
            approvedAt: '2025-10-01T10:00:00Z',
            approvedBy: 'Customer'
        },
        gallery: {
            status: 'delivered',
            totalAssets: 5,
            acceptedAssets: 0,
            rejectedAssets: 5,
            pendingAssets: 0,
            deliveredAt: '2025-10-02T10:00:00Z',
            expiresAt: null
        },
        assets: [],
        revisions: [],
        billing: {
            subtotal: 100,
            discount: 0,
            tax: 20,
            total: 120,
            currency: 'USD',
            paymentStatus: 'refunded',
            paidAt: '2025-10-01T10:00:00Z',
            invoiceUrl: null,
            lineItems: [
                { id: 'li_011', description: 'AI Avatars', quantity: 1, unitPrice: 100, total: 100 }
            ]
        },
        assignedTo: null,
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2025-10-01T10:00:00Z',
        updatedAt: '2025-10-03T10:00:00Z'
    },
    {
        id: 'ord_013',
        displayId: 'ORD-2025-0013',
        status: 'confirmed',
        type: 'video',
        clientId: 'client_009',
        clientName: 'Tech Conference',
        session: {
            date: '2026-05-20',
            time: '10:00',
            duration: 480,
            timezone: 'America/New_York',
            deliverables: 5
        },
        location: {
            type: 'on_site',
            venueName: 'Javits Center',
            address: '429 11th Ave',
            city: 'New York',
            country: 'USA',
            postalCode: '10001',
            contactPerson: 'Event Planner',
            contactPhone: null,
            notes: null
        },
        brief: {
            description: 'Keynote coverage.',
            references: [],
            approvalStatus: 'approved',
            approvedAt: '2026-01-02T10:00:00Z',
            approvedBy: 'Planner'
        },
        gallery: null,
        assets: [],
        revisions: [],
        billing: {
            subtotal: 8000,
            discount: 0,
            tax: 0,
            total: 8000,
            currency: 'USD',
            paymentStatus: 'partial',
            paidAt: '2026-01-02T10:00:00Z',
            invoiceUrl: null,
            lineItems: [
                { id: 'li_012', description: 'Conference Coverage', quantity: 1, unitPrice: 8000, total: 8000 }
            ]
        },
        assignedTo: {
            id: 'pro_008',
            name: 'NY Video',
            avatarUrl: null,
            specialty: 'Events'
        },
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2026-01-02T10:00:00Z',
        updatedAt: '2026-01-02T10:00:00Z'
    },
    {
        id: 'ord_014',
        displayId: 'ORD-2025-0014',
        status: 'delivered',
        type: 'hybrid',
        clientId: 'client_010',
        clientName: 'Wedding Couple',
        session: {
            date: '2025-09-10',
            time: '12:00',
            duration: 600,
            timezone: 'Europe/London',
            deliverables: 500
        },
        location: {
            type: 'on_site',
            venueName: 'The Manor',
            address: 'Country Lane',
            city: 'Bath',
            country: 'United Kingdom',
            postalCode: 'BA1 1AA',
            contactPerson: 'Bride',
            contactPhone: null,
            notes: null
        },
        brief: {
            description: 'Full wedding coverage.',
            references: [],
            approvalStatus: 'approved',
            approvedAt: '2025-01-10T10:00:00Z',
            approvedBy: 'Bride'
        },
        gallery: {
            status: 'delivered',
            totalAssets: 800,
            acceptedAssets: 800,
            rejectedAssets: 0,
            pendingAssets: 0,
            deliveredAt: '2025-10-10T10:00:00Z',
            expiresAt: '2026-04-10T10:00:00Z'
        },
        assets: [],
        revisions: [],
        billing: {
            subtotal: 3000,
            discount: 0,
            tax: 600,
            total: 3600,
            currency: 'GBP',
            paymentStatus: 'paid',
            paidAt: '2025-01-10T10:00:00Z',
            invoiceUrl: null,
            lineItems: [
                { id: 'li_013', description: 'Wedding Package', quantity: 1, unitPrice: 3000, total: 3000 }
            ]
        },
        assignedTo: {
            id: 'pro_009',
            name: 'Wed Snaps',
            avatarUrl: null,
            specialty: 'Weddings'
        },
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2025-01-10T10:00:00Z',
        updatedAt: '2025-10-10T10:00:00Z'
    },
    {
        id: 'ord_015',
        displayId: 'ORD-2025-0015',
        status: 'in_progress',
        type: 'photo',
        clientId: 'client_001',
        clientName: 'Acme Corporation',
        session: {
            date: '2026-01-07', // Today
            time: '09:00',
            duration: 480,
            timezone: 'Europe/London',
            deliverables: 100
        },
        location: {
            type: 'on_site',
            venueName: 'Acme Branch',
            address: 'High St',
            city: 'Bristol',
            country: 'United Kingdom',
            postalCode: 'BS1 1AA',
            contactPerson: 'Branch Mgr',
            contactPhone: null,
            notes: null
        },
        brief: {
            description: 'Branch interior.',
            references: [],
            approvalStatus: 'approved',
            approvedAt: '2026-01-01T10:00:00Z',
            approvedBy: 'John Smith'
        },
        gallery: null,
        assets: [],
        revisions: [],
        billing: {
            subtotal: 800,
            discount: 0,
            tax: 160,
            total: 960,
            currency: 'GBP',
            paymentStatus: 'paid',
            paidAt: '2026-01-01T10:00:00Z',
            invoiceUrl: null,
            lineItems: [
                { id: 'li_014', description: 'Interior Photography', quantity: 1, unitPrice: 800, total: 800 }
            ]
        },
        assignedTo: {
            id: 'pro_010',
            name: 'Interior Dan',
            avatarUrl: null,
            specialty: 'Interiors'
        },
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2026-01-01T10:00:00Z',
        updatedAt: '2026-01-07T09:00:00Z'
    },
    {
        id: 'ord_016',
        displayId: 'ORD-2025-0016',
        status: 'scheduled',
        type: 'video',
        clientId: 'client_011',
        clientName: 'Artist Studio',
        session: {
            date: '2026-02-15',
            time: '10:00',
            duration: 240,
            timezone: 'Europe/Berlin',
            deliverables: 3
        },
        location: {
            type: 'on_site',
            venueName: 'Art Loft',
            address: 'Kunst St',
            city: 'Berlin',
            country: 'Germany',
            postalCode: '10115',
            contactPerson: 'Artist',
            contactPhone: null,
            notes: null
        },
        brief: {
            description: 'Process video.',
            references: [],
            approvalStatus: 'approved',
            approvedAt: '2026-01-05T10:00:00Z',
            approvedBy: 'Artist'
        },
        gallery: null,
        assets: [],
        revisions: [],
        billing: {
            subtotal: 1200,
            discount: 0,
            tax: 228,
            total: 1428,
            currency: 'EUR',
            paymentStatus: 'paid',
            paidAt: '2026-01-05T10:00:00Z',
            invoiceUrl: null,
            lineItems: [
                { id: 'li_015', description: 'Artist Video Profile', quantity: 1, unitPrice: 1200, total: 1200 }
            ]
        },
        assignedTo: {
            id: 'pro_011',
            name: 'Cine Art',
            avatarUrl: null,
            specialty: 'Documentary'
        },
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2026-01-05T10:00:00Z',
        updatedAt: '2026-01-05T10:00:00Z'
    },
    {
        id: 'ord_017',
        displayId: 'ORD-2025-0017',
        status: 'pending_confirmation',
        type: 'hybrid',
        clientId: 'client_001',
        clientName: 'Acme Corporation',
        session: {
            date: '2026-06-01',
            time: '09:00',
            duration: 480,
            timezone: 'Europe/London',
            deliverables: 50
        },
        location: {
            type: 'on_site',
            venueName: 'Acme Factory',
            address: 'Industrial Way',
            city: 'Manchester',
            country: 'United Kingdom',
            postalCode: 'M1 1AA',
            contactPerson: 'Factory Mgr',
            contactPhone: null,
            notes: null
        },
        brief: {
            description: 'Production line overview.',
            references: [],
            approvalStatus: 'pending',
            approvedAt: null,
            approvedBy: null
        },
        gallery: null,
        assets: [],
        revisions: [],
        billing: {
            subtotal: 2000,
            discount: 0,
            tax: 400,
            total: 2400,
            currency: 'GBP',
            paymentStatus: 'pending',
            paidAt: null,
            invoiceUrl: null,
            lineItems: [
                { id: 'li_016', description: 'Factory Shoot', quantity: 1, unitPrice: 2000, total: 2000 }
            ]
        },
        assignedTo: null,
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2026-01-07T09:30:00Z',
        updatedAt: '2026-01-07T09:30:00Z'
    },
    {
        id: 'ord_018',
        displayId: 'ORD-2025-0018',
        status: 'review',
        type: 'ai',
        clientId: 'client_012',
        clientName: 'Game Studio',
        session: {
            date: null,
            time: null,
            duration: 0,
            timezone: 'UTC',
            deliverables: 20
        },
        location: {
            type: 'remote',
            venueName: null,
            address: null,
            city: null,
            country: null,
            postalCode: null,
            contactPerson: null,
            contactPhone: null,
            notes: null
        },
        brief: {
            description: 'Concept art.',
            references: [],
            approvalStatus: 'approved',
            approvedAt: '2026-01-03T10:00:00Z',
            approvedBy: 'Art Director'
        },
        gallery: {
            status: 'ready',
            totalAssets: 20,
            acceptedAssets: 5,
            rejectedAssets: 0,
            pendingAssets: 15,
            deliveredAt: '2026-01-06T10:00:00Z',
            expiresAt: null
        },
        assets: [],
        revisions: [],
        billing: {
            subtotal: 1000,
            discount: 0,
            tax: 0,
            total: 1000,
            currency: 'USD',
            paymentStatus: 'paid',
            paidAt: '2026-01-03T10:00:00Z',
            invoiceUrl: null,
            lineItems: [
                { id: 'li_017', description: 'Concept Art Package', quantity: 1, unitPrice: 1000, total: 1000 }
            ]
        },
        assignedTo: null,
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2026-01-03T10:00:00Z',
        updatedAt: '2026-01-06T10:00:00Z'
    },
    {
        id: 'ord_long_id',
        displayId: 'ORD-2025-EXTREMELY-LONG-ID-TESTING-TRUNCATION-1234567890',
        status: 'draft',
        type: 'photo',
        clientId: 'client_123',
        clientName: 'Truncation Test Corp',
        session: {
            date: null,
            time: null,
            duration: 0,
            timezone: 'UTC',
            deliverables: null
        },
        location: {
            type: 'remote',
            venueName: null,
            address: null,
            city: null,
            country: null,
            postalCode: null,
            contactPerson: null,
            contactPhone: null,
            notes: null
        },
        brief: {
            description: 'Testing long ID display.',
            references: [],
            approvalStatus: 'pending',
            approvedAt: null,
            approvedBy: null
        },
        gallery: null,
        assets: [],
        revisions: [],
        billing: {
            subtotal: 0,
            discount: 0,
            tax: 0,
            total: 0,
            currency: 'GBP',
            paymentStatus: 'pending',
            paidAt: null,
            invoiceUrl: null,
            lineItems: []
        },
        assignedTo: null,
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2026-01-01T00:00:00Z',
        updatedAt: '2026-01-01T00:00:00Z'
    },
    {
        id: 'ord_019',
        displayId: 'ORD-2025-0019',
        status: 'confirmed',
        type: 'photo',
        clientId: 'client_013',
        clientName: 'Law Firm',
        session: {
            date: '2026-01-20',
            time: '11:00',
            duration: 60,
            timezone: 'Europe/London',
            deliverables: 10
        },
        location: {
            type: 'on_site',
            venueName: 'Law & Partners',
            address: 'Chancery Lane',
            city: 'London',
            country: 'United Kingdom',
            postalCode: 'WC2A 1AA',
            contactPerson: 'Partner',
            contactPhone: null,
            notes: null
        },
        brief: {
            description: 'Partner portrait.',
            references: [],
            approvalStatus: 'approved',
            approvedAt: '2026-01-04T10:00:00Z',
            approvedBy: 'Partner'
        },
        gallery: null,
        assets: [],
        revisions: [],
        billing: {
            subtotal: 400,
            discount: 0,
            tax: 80,
            total: 480,
            currency: 'GBP',
            paymentStatus: 'pending',
            paidAt: null,
            invoiceUrl: null,
            lineItems: [
                { id: 'li_018', description: 'Portrait Session', quantity: 1, unitPrice: 400, total: 400 }
            ]
        },
        assignedTo: {
            id: 'pro_012',
            name: 'Portrait Pete',
            avatarUrl: null,
            specialty: 'Portraits'
        },
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2026-01-04T10:00:00Z',
        updatedAt: '2026-01-04T10:00:00Z'
    },
    {
        id: 'ord_020',
        displayId: 'ORD-2025-0020',
        status: 'draft',
        type: 'video',
        clientId: 'client_001',
        clientName: 'Acme Corporation',
        session: {
            date: null,
            time: null,
            duration: 0,
            timezone: 'Europe/London',
            deliverables: null
        },
        location: {
            type: 'on_site',
            venueName: null,
            address: null,
            city: null,
            country: null,
            postalCode: null,
            contactPerson: null,
            contactPhone: null,
            notes: null
        },
        brief: {
            description: 'Annual report video.',
            references: [],
            approvalStatus: 'pending',
            approvedAt: null,
            approvedBy: null
        },
        gallery: null,
        assets: [],
        revisions: [],
        billing: {
            subtotal: 0,
            discount: 0,
            tax: 0,
            total: 0,
            currency: 'GBP',
            paymentStatus: 'pending',
            paidAt: null,
            invoiceUrl: null,
            lineItems: []
        },
        assignedTo: null,
        auditLog: [],
        source: 'platform',
        apiOrderId: null,
        createdAt: '2026-01-07T10:30:00Z',
        updatedAt: '2026-01-07T10:30:00Z'
    }
];

// Helper to convert to list items
export function getOrderListItems(): OrderListItem[] {
    return mockOrders.map(order => ({
        id: order.id,
        displayId: order.displayId,
        status: order.status,
        type: order.type,
        clientName: order.clientName,
        sessionDate: order.session.date,
        location: order.location.city
            ? `${order.location.city}, ${order.location.country}`
            : order.location.type === 'remote' ? 'Remote' : null,
        paymentStatus: order.billing.paymentStatus,
        total: order.billing.total,
        currency: order.billing.currency,
        createdAt: order.createdAt,
        createdBy: order.auditLog[0]?.actor.name || order.clientName
    }));
}

// Get single order by ID
export function getOrderById(id: string): Order | undefined {
    return mockOrders.find(order => order.id === id);
}
