# FarmDirect Delivery Partner Integration

This build keeps the existing FarmDirect marketplace flow and adds the delivery-partner workflow on top of the existing MongoDB schema.

## Added roles
- buyer (existing)
- farmer (existing)
- admin (existing)
- delivery_partner (new)

## Added backend models
- `backend/src/models/DeliveryPartner.js`
- `backend/src/models/DeliveryAssignment.js`

Existing `User` and `Order` models were extended with delivery fields; existing fields were not removed.

## Added API routes
- `GET /api/delivery/nearby`
- `GET /api/delivery/partners` (admin)
- `POST /api/delivery/partners` (admin)
- `POST /api/delivery/assign` (farmer/admin)
- `GET /api/delivery/my-assignments` (delivery partner)
- `PATCH /api/delivery/location` (delivery partner)
- `PATCH /api/delivery/assignments/:id/status` (delivery partner/admin)
- `GET /api/delivery/orders/:id/tracking` (buyer/farmer/admin/delivery partner)

## UI additions
- Farmer dashboard: select an active order -> Find Nearby -> assign a partner.
- Admin dashboard: create and monitor delivery partners.
- Orders page: admin can assign a partner; buyer can track assigned deliveries.
- Delivery Partner dashboard: `/delivery` with Accept -> Pickup -> Out for Delivery -> Delivered and GPS updates.

## Running
Keep your existing `.env` unchanged. Install frontend and backend dependencies as before.

Frontend:
`npm install`
`npm run dev`

Backend:
`cd backend`
`npm install`
`npm run dev`

No database reset, migration, seed replacement, or `.env` secret is included in this ZIP.
