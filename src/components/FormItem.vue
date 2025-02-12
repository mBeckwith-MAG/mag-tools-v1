<template>
    <div class="row">
        <label class="col col-form-label">
            <slot name="label"></slot>
        </label>
        <div class="col">
            <input type="number" min="0.00" max="1000000.00" step="0.01" class="form-control" placeholder="0.00">
        </div>
    </div>
</template>