from django.shortcuts import render
from .models import Salesperson, Customer, Sale, AutomobileVO
import json
from django.http import JsonResponse
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "vin",
        "sold",
        "import_href",
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "price",
        "automobile",
        "salesperson",
        "customer",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":

        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
        )
    elif request.method == "POST":

        content = json.loads(request.body)

        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=Salesperson,
            safe=False,
        )
# Needs to return 400 or 404 error


# @require_http_methods(["GET"])
# def api_show_salesperson(request, id):
#     if request.method == "GET":
#         salesperson = Salesperson.objects.get(id=id)
#         return JsonResponse(
#             salesperson,
#             encoder=Salesperson,
#             safe=False,
#         )


@require_http_methods(["DELETE"])
def api_salespeople(request, pk):
    if request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=pk)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
# Needs to return 400 or 404 error


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":

        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
            safe=False,
        )
    elif request.method == "POST":

        content = json.loads(request.body)
        print('Content', content)

        customer = Customer.objects.create(**content)
        print('Customer', customer)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
    return JsonResponse({"message": "Does not exist"})
# Needs to return 400 or 404 error


@require_http_methods(["DELETE"])
def api_customers(request, pk):
    if request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
# Needs to return 400 or 404 error


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":

        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
        )
    elif request.method == "POST":

        content = json.loads(request.body)

        automobile = AutomobileVO.objects.get(import_href=content["automobile"])
        content["automobile"] = automobile

        salesperson = Salesperson.objects.get(employee_id=content["salesperson"])
        content["salesperson"] = salesperson

        customer = Customer.objects.get(phone_number=content["customer"])
        content["customer"] = customer

        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )
# Needs to return 400 or 404 error


@require_http_methods(["DELETE"])
def api_sales(request, pk):
    if request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
# Needs to return 400 or 404 error
