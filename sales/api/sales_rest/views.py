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
    else:
        content = json.loads(request.body)

        salesperson = Salesperson.objects.create(**content)

        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )
# Needs to return 400 or 404 error


@require_http_methods(["DELETE", "GET"])
def api_salespeople(request, pk):
    if request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=pk)
            salesperson.delete()

            response = JsonResponse({"message": "Salesperson deleted"}, status=200)

        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"}, status=400)
        return response
    else:
        salesperson = Salesperson.objects.get(id=pk)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )

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

        customer = Customer.objects.create(**content)

        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
    return JsonResponse({"message": "Does not exist"})
# Needs to return 400 or 404 error


@require_http_methods(["DELETE", "GET"])
def api_customers(request, pk):
    if request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()

            response = JsonResponse({"message": "Customer deleted"}, status=200)

        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"}, status=400)
        return response
    else:
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )

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

        automobile = AutomobileVO.objects.get(id=content["automobile"])
        content["automobile"] = automobile

        salesperson = Salesperson.objects.get(id=content["salesperson"])
        content["salesperson"] = salesperson

        customer = Customer.objects.get(id=content["customer"])
        content["customer"] = customer

        sale = Sale.objects.create(**content)

        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )
# Needs to return 400 or 404 error


@require_http_methods(["DELETE", "GET"])
def api_sales(request, pk):
    if request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=pk)
            sale.delete()

            response = JsonResponse({"message": "Sale deleted"}, status=200)

        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
        return response
    else:
        sale = Sale.objects.get(id=pk)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )
# Needs to return 400 or 404 error


@require_http_methods(["DELETE", "GET"])
def api_customers(request, pk):
    if request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()

            response = JsonResponse({"message": "Customer deleted"}, status=200)

        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"}, status=400)
        return response
    else:
        customer = Customer.objects.get(id=pk)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )
