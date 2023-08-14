<?php

use App\Models\Shift;
use App\Models\User;
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
        Schema::create('works', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Shift::class)->references("id")->on("shifts");
            $table->foreignIdFor(User::class)->references("id")->on("users");
            $table->time("started_at")->nullable();
            $table->time("ended_at")->nullable();
            $table->json("location")->nullable();
            $table->boolean("changed")->default(false);
            $table->boolean("accepted")->default(false);
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
        Schema::dropIfExists('works');
    }
};
