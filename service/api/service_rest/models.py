from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default=False)
    import_href = models.CharField(max_length=200, unique=True)


class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.IntegerField(unique=True)


class Appointment(models.Model):
    date_time = models.DateTimeField(auto_now=True, null=True)
    isVIP = models.BooleanField(default=False)
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=50, default="created")
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE
    )
