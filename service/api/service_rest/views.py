from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import Appointment, Technician, AutomobileVO
from .encoders import AppointmentEncoder, TechnicianEncoder, AutomobileVOEncoder
# Create your views here.

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder = TechnicianEncoder
        )
    else:
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )

@require_http_methods(["DELETE"])
def api_delete_technician(request, pk):
    if request.method == "DELETE":
        try:
            technician = Technician.objects.get(employee_id=pk)
            technician.delete()

            response = JsonResponse({"message": "Technician deleted"}, status=200)

        except Technician.DoesNotExist:
            response = JsonResponse({"message":"Does not exist"}, status=400)
        return response


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method=="GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder
        )
    else:
        content = json.loads(request.body)

        technician_id = content["technician"]
        try:
            technician = Technician.objects.get(employee_id=technician_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse({"error": "technician not found"},status=404)

        content["technician"] = technician
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )

@require_http_methods(["DELETE"])
def api_delete_appointment(request, pk):
    if request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.delete()

            response = JsonResponse(
                {"message": "Appointment deleted"},
                status=200
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"}, status=404)
        return response


@require_http_methods(["PUT"])
def api_cancel_appointment(request, id):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.status = "canceled"
            appointment.save()
            response = JsonResponse(
                {"message": "Appointment has been canceled"},
                status=200
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"}, status=404)
        return response


@require_http_methods(["PUT"])
def api_finish_appointment(request, id):
    if request.method == "PUT":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.status = "finished"
            appointment.save()
            response = JsonResponse(
                {"message": "Appointment has been finished"},
                status=200
            )
        except Appointment.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"}, status=404)
    return response


@require_http_methods(["GET"])
def api_show_technician(request, pk):
    if request.method == "GET":
        technician = Technician.objects.get(employee_id=pk)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )

@require_http_methods(["GET"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )
