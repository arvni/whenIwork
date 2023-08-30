<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $permissions=[];

        $models=["admin.permissions","admin.roles","admin.users","admin.departments"];

        $perms=["index","create","show","edit","destroy"];

        foreach ($models as $model){
            foreach ($perms as $perm){
                $permissions[]=Permission::findOrCreate("$model.$perm");
            }
        }
        $permissions[]=Permission::findOrCreate("admin.users.chang_password");
        $permissions[]=Permission::findOrCreate("admin.users.leaves");

        $role=Role::findOrCreate("Admin")->syncPermissions($permissions);
         $user=\App\Models\User::factory()->create([
             'name' => 'Admin',
             'userId'=>"admin",
             'email' => 'admin@admin.com',
             'password'=>Hash::make("P@ssw0rd")
         ]);
         $user->roles()->attach($role);
    }
}
