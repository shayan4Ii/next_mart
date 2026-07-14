from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from products.models import Product

from .models import Cart, CartItem
from .serializers import CartItemSerializer



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_cart(request):

    product_id = request.data.get("product_id")


    if not product_id:
        return Response(
            {
                "success": False,
                "message": "Product ID is required."
            },
            status=400
        )


    product = get_object_or_404(
        Product,
        id=product_id
    )


    cart, created = Cart.objects.get_or_create(
        user=request.user
    )


    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product
    )


    if not created:

        cart_item.quantity += 1
        cart_item.save()



    return Response(
        {
            "success": True,
            "message": "Product added to cart.",
            "product": product.name,
            "quantity": cart_item.quantity
        }
    )




@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_cart(request):

    cart, created = Cart.objects.get_or_create(
        user=request.user
    )


    cart_items = CartItem.objects.filter(
        cart=cart
    )

    serializer = CartItemSerializer(
        cart_items,
        many=True
    )


    return Response(serializer.data)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_cart_item(request, id):

    try:

        cart_item = CartItem.objects.get(
            id=id,
            cart__user=request.user
        )


        cart_item.delete()


        return Response({
            "success": True,
            "message": "Item removed from cart"
        })


    except CartItem.DoesNotExist:


        return Response(
            {
                "success": False,
                "message": "Item not found"
            },
            status=404
        )