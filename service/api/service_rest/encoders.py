import json
from .models import Appointment, Technician, AutomobileVO
from common.json import ModelEncoder
# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model =AutomobileVO
    properties = [
        "id",
        "vin",
        "sold",
        "import_href"
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
    ]
    def get_extra_data(self, o):
        return {"technician": o.technician.employee_id}
