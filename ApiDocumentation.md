## Admin API Routes

1. /admin/users

    method: Get
    response : fetches all users in array format

2. /admin/create
    method: Post
    body:{
        name:"Admin",
        email:"admin@gmail.com",
        role:"admin",
        password:"admin@123"
    }

    response : "Account created successfully"

3. /admin/login
    method: Post
    body:{
        email:"admin@gmail.com",
        password:"admin@123"
    }

    response : {
        status:'ok',
        result:"token..."
    }
4. /admin/user/:id
    method: put
    body:{
        name:"Admin",
        email:"admin@gmail.com",
        role:"admin"
    }

    response : "Updated User Successfully"

5. /admin/user/:id
    method: delete
    body:{
        name:"Admin",
        email:"admin@gmail.com",
        role:"admin"
    }

    response : "User deleted Successfully"


6. /admin/addproduct
    method: Post
    body:{
        "name": "Red T-Shirt",
        "description": "Comfortable cotton t-shirt",
        "price": 19.99,
        "image": "https://example.com/images/red-shirt.jpg",
        "rating": 4.5,
        "stocks": 50,
        "category": "Clothing",
        "uploadedBy": "user123"
    }

    response: {
        "status": "ok",
        "result": {
            "name": "Red T-Shirt",
            "description": "Comfortable cotton t-shirt",
            "price": 19.99,
            "image": "https://example.com/images/red-shirt.jpg",
            "rating": 4.5,
            "stocks": 50,
            "category": "Clothing",
            "uploadedBy": "user123",
            "_id": "682c627192bdad176df75a94",
            "pId": "2ee9dec6-c5de-4b90-a3a2-810618881ef5"
        },
        "message": "Product added successfully."
    }

7. /admin/products
    method: Get

    response : fetches all products in array format