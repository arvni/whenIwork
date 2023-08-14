<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_requests', function (Blueprint $table) {
            $table->id();
            $table->nullableMorphs("requestable");
            $table->foreignIdFor(\App\Models\User::class)->references("id")->on("users")->cascadeOnDelete();
            $table->enum("type", ["shift", "changeUser", "takeLeave"]);
            $table->text("message")->nullable();
            $table->enum("status", ["waiting", "rejected", "cancel"])->default("waiting");
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
        Schema::dropIfExists('client_requests');
    }
};
