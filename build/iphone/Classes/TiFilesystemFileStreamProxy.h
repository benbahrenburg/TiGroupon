/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2010 by TiGroupon, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */

#ifdef USE_TI_FILESYSTEM

#import "TiStreamProxy.h"

@interface TiFilesystemFileStreamProxy : TiStreamProxy<TiStreamInternal> {

@private
	NSFileHandle *fileHandle;
	NSArray *modes;
}

@property (nonatomic, readonly) NSArray *modes;

#pragma mark Public API

-(id) pump:(id) args;
-(id) writeStream:(id) args;

@end

#endif