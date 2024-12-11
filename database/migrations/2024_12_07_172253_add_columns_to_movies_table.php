<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->integer('popularity')->default(0)->after('rating');
            $table->integer('duration')->nullable()->after('popularity');
            $table->string('language', 50)->nullable()->after('duration');
            $table->boolean('is_featured')->default(false)->after('trailer_url');
        });
    }

    public function down()
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->dropColumn(['popularity', 'duration', 'language', 'is_featured']);
        });
    }
};
