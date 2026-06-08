from rest_framework import serializers
from .models import Category, Transaction, Budget, RecurringExpense

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'icon']

class TransactionSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'category', 'category_name', 'amount', 'month', 'year']

class BudgetSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Budget
        fields = ['id', 'category', 'category_name', 'amount', 'month', 'year']

class RecurringExpenseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = RecurringExpense
        fields = ['id', 'category', 'category_name', 'description', 'amount', 'frequency', 'start_date', 'is_activate']