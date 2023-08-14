<?php

namespace Tests\Feature\Admin;


use App\Models\User;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_can_view_users_index()
    {
        $this->seed();
        $user=User::first();
        $this->actingAs($user)
            ->get(route("admin.users.index"))
            ->assertInertia(
                fn(AssertableInertia $page) => $page
                    ->component("Admin/User/Index")->has("users")
            );
    }
}
