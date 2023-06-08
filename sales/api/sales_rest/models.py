from django.db import models


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=200, unique=True, null=True)
    sold = models.BooleanField(default=False)
    import_href = models.CharField(max_length=200, unique=True, null=True)


class Salesperson(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.IntegerField(unique=True)


class Customer(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=200)


class Sale(models.Model):
    price = models.CharField(max_length=200)
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE,
    )
