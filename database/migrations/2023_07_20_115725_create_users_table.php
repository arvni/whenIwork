<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("userId")->unique();
            $table->string("mobileNo")->nullable();
            $table->string("email")->nullable();
            $table->string("avatar")->nullable();
            $table->string("password");
            $table->boolean("isActive")->default(true);
            $table->timestamp("mobile_verified_at")->nullable();
            $table->timestamp("email_verified_at")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
