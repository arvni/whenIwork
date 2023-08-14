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
        Schema::create('leaves', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class)->references("id")->on("users");
            $table->foreignIdFor(\App\Models\User::class, "acceptor_id")->references("id")->on("users");
            $table->timestamp("started_at");
            $table->timestamp("ended_at");
            $table->enum("type", ["hourly", "daily"]);
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
        Schema::dropIfExists('leaves');
    }
};
