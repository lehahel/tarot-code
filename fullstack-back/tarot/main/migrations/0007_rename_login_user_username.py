# Generated by Django 4.0.1 on 2022-01-14 14:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_rename_id_user_uuid_user_groups_user_is_superuser_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='login',
            new_name='username',
        ),
    ]
