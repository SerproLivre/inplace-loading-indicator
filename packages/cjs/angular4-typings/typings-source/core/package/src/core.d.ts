/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point from which you should import all public core APIs.
 */
export * from './metadata/di'
export * from './metadata/directives'
export * from './metadata/lifecycle_hooks'
export * from './metadata/ng_module'
export * from './metadata/view'
export * from './version';
export { Class, ClassDefinition, TypeDecorator } from './util/decorators';
export * from './di/forward_ref'
export * from './di/injection_token'
export * from './di/injector'
export * from './di/metadata'
export * from './di/provider'
export * from './di/reflective_errors'
export * from './di/reflective_injector'
export * from './di/reflective_key'
export * from './di/reflective_provider'
export { createPlatform, assertPlatform, destroyPlatform, getPlatform, PlatformRef, ApplicationRef, enableProdMode, isDevMode, createPlatformFactory, NgProbeToken } from './application_ref';
export { APP_ID, PACKAGE_ROOT_URL, PLATFORM_INITIALIZER, PLATFORM_ID, APP_BOOTSTRAP_LISTENER } from './application_tokens';
export { APP_INITIALIZER, ApplicationInitStatus } from './application_init';
export * from './zone/ng_zone'
export * from './render/api'
export * from './linker/compiler'
export * from './linker/component_factory'
export * from './linker/component_factory_resolver'
export * from './linker/element_ref'
export * from './linker/ng_module_factory'
export * from './linker/ng_module_factory_loader'
export * from './linker/query_list'
export * from './linker/system_js_ng_module_factory_loader'
export * from './linker/template_ref'
export * from './linker/view_container_ref'
export * from './linker/view_ref'
export { DebugElement, DebugNode, asNativeElements, getDebugNode, Predicate } from './debug/debug_node';
export { GetTestability, Testability, TestabilityRegistry, setTestabilityGetter } from './testability/testability';
export * from './change_detection/change_detection'
export * from './change_detection/change_detection_util'
export * from './change_detection/change_detector_ref'
export * from './change_detection/constants'
export * from './change_detection/pipe_transform'
export * from './platform_core_providers';
export { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, MissingTranslationStrategy } from './i18n/tokens';
export { ApplicationModule } from './application_module';
export { wtfCreateScope, wtfLeave, wtfStartTimeRange, wtfEndTimeRange, WtfScopeFn } from './profile/profile';
export { Type } from './type';
export { EventEmitter } from './event_emitter';
export { ErrorHandler } from './error_handler';
export * from './core_private_export';
export { Sanitizer, SecurityContext } from './security';
export * from './codegen_private_exports';
export * from './animation/animation_metadata_wrapped';
/**
 * @deprecated from v4
 */
export declare type AnimationEntryMetadata = any;
/**
 * @deprecated from v4
 */
export declare type AnimationStateTransitionMetadata = any;
/**
 * @deprecated from v4
 */
export declare type AnimationPlayer = any;
/**
 * @deprecated from v4
 */
export declare type AnimationStyles = any;
/**
 * @deprecated from v4
 */
export declare type AnimationKeyframe = any;
