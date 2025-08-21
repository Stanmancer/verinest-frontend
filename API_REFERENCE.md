# VeriNest API Documentation

## Base URL

All endpoints are available at: `https://verinest.up.railway.app/api/`

---

## Authentication Endpoints

<details>
<summary><strong>POST /api/auth/register</strong> - User Registration</summary>

### Request Body

```json
{
"name": "string (required, min 1 char)",
"username": "string (required, min 1 char)",
"email": "string (required, valid email)",
"password": "string (required, min 6 chars)",
"passwordConfirm": "string (required, must match password)",
"referral_code": "string (optional)"
}
```

### Response

```json
{
"status": "success",
"data": {
"user": {
"id": "uuid",
"name": "string",
"email": "string",
"role": "string",
"trust_score": 0,
"verified": false,
"nationality": "string|null",
"lga": "string",
"dob": "datetime",
"wallet_address": "string|null",
"createdAt": "datetime",
"updatedAt": "datetime"
}
}
}
```

</details>

<details>
<summary><strong>POST /api/auth/login</strong> - User Login</summary>

### Request Body

```json
{
"email": "string (required, valid email)",
"password": "string (required, min 6 chars)"
}
```

### Response

```json
{
"status": "success",
"token": "jwt_token"
}
```
_Note: Also sets HTTP-only cookie_

</details>

<details>
<summary><strong>GET /api/auth/verify</strong> - Email Verification</summary>

### Query Parameters

-   `token`: string (required)

### Response

Redirects to frontend settings page with auth cookie

</details>

<details>
<summary><strong>POST /api/auth/forgot-password</strong> - Request Password Reset</summary>

### Request Body

```json
{
"email": "string (required, valid email)"
}
```

### Response

```json
{
"status": "success",
"message": "Password reset link has been sent to your email."
}
```

</details>

<details>
<summary><strong>POST /api/auth/reset-password</strong> - Reset Password</summary>

### Request Body

```json
{
"token": "string (required)",
"new_password": "string (required, min 6 chars)",
"new_password_confirm": "string (required, must match new_password)"
}
```

### Response

```json
{
"status": "success",
"message": "Password has been successfully reset."
}
```

</details>

---

## User Endpoints

_🔒 All user endpoints require authentication_

<details>
<summary><strong>GET /api/users/me</strong> - Get Current User Profile</summary>

### Response

```json
{
"status": "success",
"data": {
"user": {
"id": "uuid",
"name": "string",
"email": "string",
"role": "string",
"trust_score": 0,
"verified": false,
"nationality": "string|null",
"lga": "string",
"dob": "datetime",
"wallet_address": "string|null",
"createdAt": "datetime",
"updatedAt": "datetime"
}
}
}
```

</details>

<details>
<summary><strong>GET /api/users</strong> - Get All Users (Paginated)</summary>

### Query Parameters

-   `page`: number (optional, default: 1)
-   `limit`: number (optional, default: 10, max: 50)

### Response

```json
{
"status": "success",
"users": [
{
"id": "uuid",
"username": "string",
"trust_score": 0,
"wallet_address": "string|null"
}
],
"results": 100
}
```

</details>

<details>
<summary><strong>PUT /api/users/name</strong> - Update User Name</summary>

### Request Body

```json
{
"name": "string (required, min 1 char)"
}
```

### Response

```json
{
"status": "success",
"data": {
"user": {
"id": "uuid",
"name": "string",
"email": "string",
"role": "string",
"trust_score": 0,
"verified": false,
"nationality": "string|null",
"lga": "string",
"dob": "datetime",
"wallet_address": "string|null",
"createdAt": "datetime",
"updatedAt": "datetime"
}
}
}
```

</details>

<details>
<summary><strong>PUT /api/users/role</strong> - Update User Role (Admin Only)</summary>

### Request Body

```json
{
"role": "Admin|User",
"target_user_id": "uuid"
}
```

### Response

Same as name update response

</details>

<details>
<summary><strong>PUT /api/users/password</strong> - Change Password</summary>

### Request Body

```json
{
"old_password": "string (required, min 6 chars)",
"new_password": "string (required, min 6 chars)",
"new_password_confirm": "string (required, must match new_password)"
}
```

### Response

```json
{
"status": "success",
"message": "Password updated Successfully"
}
```

</details>

<details>
<summary><strong>PUT /api/users/trust_point</strong> - Update Trust Points</summary>

### Request Body

```json
{
"user_id": "uuid",
"score_to_add": 0
}
```

### Response

Same as name update response

</details>

---

## Leaderboard & Social Features

<details>
<summary><strong>GET /api/users/leaderboard</strong> - Get Trust Score Leaderboard</summary>

### Query Parameters

-   `limit`: number (optional, default: 100)

### Response

```json
{
"status": "success",
"users": [
{
"id": "uuid",
"username": "string",
"trust_score": 0,
"wallet_address": "string|null"
}
],
"results": 100
}
```

</details>

---

## Referral System

<details>
<summary><strong>GET /api/users/referral-link</strong> - Get User's Referral Link</summary>

### Response

```json
{
"status": "success",
"data": {
"referral_code": "string",
"referral_link": "https://verinest.up.railway.app/register?ref=CODE"
}
}
```

</details>

<details>
<summary><strong>GET /api/users/referral-stats</strong> - Get Referral Statistics</summary>

### Response

```json
{
"status": "success",
"data": {
"total_referrals": 0,
"total_points_earned": 0,
"successful_referrals": [
{
"id": "uuid",
"name": "string",
"username": "string",
"email": "string",
"joined_at": "datetime"
}
]
}
}
```

</details>

<details>
<summary><strong>GET /api/users/referral-status</strong> - Check If User Was Referred</summary>

### Response

```json
{
"status": "success",
"data": {
"was_referred": true,
"referral_info": {
"referrer_name": "string",
"referrer_username": "string",
"points_earned": 0,
"referred_at": "datetime"
}
}
}
```

</details>

---

## Authentication Notes

-   **JWT Tokens**: Login endpoint returns JWT token and sets HTTP-only cookie
-   **Protected Routes**: All `/api/users/*` endpoints require authentication
-   **Admin Routes**: Role update endpoint requires Admin privileges
-   **Email Verification**: Users must verify email through verification endpoint

## Error Handling

All endpoints return appropriate HTTP status codes:

-   `200`: Success
-   `400`: Bad Request (validation errors)
-   `401`: Unauthorized
-   `403`: Forbidden (insufficient permissions)
-   `404`: Not Found
-   `500`: Internal Server Error
