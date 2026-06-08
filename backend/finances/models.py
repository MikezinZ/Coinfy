from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Categories"
        unique_together = ('user', 'name') # Para o usuário não criar duas categorias com mesmo nome
    def __str__(self):
        return f"{self.name} ({self.user.username})"
    
class Transaction(models.Model):
    TYPE_CHOICHES = [
        ('INCOME', 'Receita'),
        ('EXPENSE', 'Despesa'),
        ('INVESTMENT', 'Investimento'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    Category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='transactions')
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    date = models.DateField()
    type = models.CharField(max_length=10, choices=TYPE_CHOICHES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # Para ordenar pela data mais recente e pela ordem de criação
        ordering = ['-date', '-created_at']
    
    def __str__(self):
        return f"{self.description} | {self.type} - R$ {self.amount}"
    
class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='budgets')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='budgets')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    month = models.PositiveSmallIntegerField()
    year = models.PositiveIntegerField()

    class Meta:
        unique_together = ('user', 'category', 'month', 'year') # um limite por categoria para mês/ano
    
    def __str__(self):
        return f"Orçamento {self.category.name} - {self.month}/{self.year}: R$ {self.amount}"
    

class RecurringExpense(models.Model):
    FREQUENCY_CHOICES = [
        ('MONTHLY', 'Mensal'),
        ('YEARLY', 'Anual'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recurring_expenses')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='recurring_expenses')
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    frequency = models.CharField(max_length=10, choices=FREQUENCY_CHOICES, default='MONTHLY')
    start_date = models.DateField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.description} ({self.get_frequency_display()}) - R$ {self.amount}"