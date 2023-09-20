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
        Schema::create('role_shift', function (Blueprint $table) {
            $table->foreignIdFor(\App\Models\Role::class)->references("id")->on("roles");
            $table->foreignIdFor(\App\Models\Shift::class)->references("id")->on("shifts");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('role_shift');
    }
};
